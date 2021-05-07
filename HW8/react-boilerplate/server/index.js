/* eslint consistent-return:0 import/order:0 */
const Promise = require ('bluebird');
const redis = Promise.promisifyAll(require('redis'))
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const argon2 = require('argon2');

const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');

const session = require('express-session')
let RedisStore = require('connect-redis')(session)
const csurf = require('csurf')

var mongoose = require('mongoose');
var { School } = require('./models/School');
var User = require('./models/User');

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/anatomylab");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
  // we're connected!
  function find(inp, q, cb) {
    const { query, data } = inp;
    let asl = School.findOne({school: query.name}).exec(function(err, school) {
      if(err){console.log(err); return}
      let session;
      let block = school.blocks.find((b) => {
        session = b.sessions.find(s => {
          const ld = new Date(s.labdate);
          console.log('ld: ', ld.toDateString(), query.date);
          return query.date === ld. toDateString();
        });
        return session;
      });

      // murali's "random code"
      console.log('session: ', session);
      const grde = session.asls.fing(a => a.asl_term_index_num === query.asl_term_index_num).output[query.table][query.side];
      console.log('grade: ', grde);
      grde.grade = data.grade;
      grde.grader = data.grader;
      DeferredPermissionRequest.date = data.date;
      grde.completing_group = data.completing_group;
      school.save();
    });
  }

  const date = (new Date(2021, 3, 15, 12, 0, 0)).toDateString();
  console.log('date: ', date.toString())
  find({ query: { name: 'WMCarey', date, asl_term_index_num: '23', table: '12', side: 'left' }, data : { grade: 3, grader: 'ch', date, completing_group: 'B' } }, {});
});

function ValidateSchoolAndData(req) {
  const { school } = req.body;
  let { date } = req.body;
  const schoolRE = /^\w{1,10}$/;
  if(!schoolRE.test(school)) {
    return false;
  }
  if(!isValidDate(new Date(date))) {
    return false;
  }
  date = (new Date(date)).toDateString();
  return { school, date };
}

// function getBlockAndSession(inp) {
//   const { query } = inp;
//   let session, block;
//   return School.findOne({school: query.school})
//   .exec()
//   .then((school) => {
//     if(!school){console.log('no school! for ', inp); return false; }
//     block = school.blocks.find((b) => {
//       session = b.sessions.find(s => {
//         const ld = new Date(s.labdate);
//         //console.log('ld: ', ld.toDateString(), query.date);
//         return query.date === ld.toDateString();
//       });
//       return session;
//     });
//     if(block) {
//       session = { ...session.toObject(), block_id: block.block_id, block_name: block.block_name };
//     } else {
//       console.log('block was not found for input: ', inp);
//       session = { error: 'session not found', ...inp };
//       console.log('session: ', session);
//     }
//     return session;
//   })
// }

function getHomeworkAndSession(inp) {
  const { query } = inp;
  let session, course;
  return Course.findOne({course: query.course})
  .exec()
  .then((course) => {
    if(!course){console.log('no assignment for ', inp); return false; }
    assignment = course.assignments.find((b) => {
      session = b.sessions.find(s => {
        const ld = new Date(s.due_date);
        return query.date === ld.toDateString();
      });
      return session;
    });
    if(assignment) {
      session = { ...session.toObject(), title: assignment.title, due_date: assignment.due_date };
    } else {
      console.log('no assignments found for ', inp);
      session = {error: 'session not found', ...inp };
      console.log('session: ', session);
    }
    return session;
  })
}

const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const { Assignment } = require('./models/Assignment');

const client = redis.createClient();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
var csrfProtection = csurf({ignoreMethods: ["HEAD", "OPTIONS"]});

app.use(
  session({
    store: new RedisStore({ client }),
    saveUninitialized: false,
    secret: 'keyboard cat', 
    resave: false,
    cookie: {
      httpOnly: true,
      secure: false, // change to true in production
      maxAge: 365 * 24 * 60 * 60
    }
  })
)

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
const options = {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
}

const { fsInMem } = setup(app, options);
// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line

  res.set('Content-Encoding', 'gzip');
  next();
});

app.head('/get_csrf_token', csrfProtection, (req, res) => {
  const csrf_token = req.csrfToken()
  res.setHeader('X-CSRF-Token', csrf_token)
  res.send("OK")
})

app.get('/test', (req, res) => {
  res.json({course: 'csc441'}).end();
})

// add csrf protection
// app.post('/getUser', (req, res) => {
//   var email = req.body.username;
//   var localPass = req.body.password;
//   User.findOne({email:email}, function(err, content){
//     console.log("called");
//     if(err){
//       console.log("error: "+err);
//       res.json({"Error": "Login credential error"})
//       return 
//     } else {
//       if(content){
//         content = content.toObject();
//         const { email, password, school, auth, firstName, lastName } = content;
//         const verifyPass = async () => {
//           try {
//             const argon2 = require('argon2');

//             if(await argon2.verify(content.password, localPass)) {
//               console.log("match");

//               // add Data to express-session

//               res.json({msg: `Welcome ${firstName} ${lastName}`});
//             } else {
//               console.log("no match");
//               res.json({})
//             }
//           } catch (err) {
//             console.log(err);
//           }
//         }
//         verifyPass();
//       } else {
//         res.json({"Error": "Login credential error"})
//       }
//     }
//   })
// });

// HW 8
app.post('/signin', csrfProtection, (req, res) => {
  var username = req.body.username;
  var localPass = req.body.password;
  User.findOne({username:username}, function(err, content){
    console.log("called");
    if(err){
      console.log("error: "+err);
      res.json({"Error": "Login credential error"})
      return 
    } else {
      if(content){
        content = content.toObject();
        const { username, password, academic_standing, auth } = content;
        content.auth = True;
        const verifyPass = async () => {
          try {
            const argon2 = require('argon2');

            if(await argon2.verify(content.password, localPass)) {
              console.log("match");

              // add Data to express-session

              res.json({msg: `Welcome ${firstName} ${lastName}`});
            } else {
              console.log("no match");
              res.json({})
            }
          } catch (err) {
            console.log(err);
          }
        }
        verifyPass();
      } else {
        res.json({"Error": "Login credential error"})
      }
    }
  })
});

// add csrf protection
// app.post('/getData', async (req, res) => {
//   const sd = validateSchoolAndDate(req);
//   if(!sd) {
//     res.send(403, "Access Denied!");
//   }
//   // verify that user is authenticated
//   //console.log('getData:sd: ', sd);
//   const data = await getBlockAndSession({ query: sd});
//   res.json(data);
// });

// HW 8
app.post('/getData', async (req, res) => {
  const sd = validateSchoolAndDate(req);
  if(!sd) {
    res.send(403, "Access Denied!");
  }
  const data = await getHomeworkAndSession({ query: sd });
  res.json(data);
})

app.get('/gitget/:username', async (req, res) => {
  const {username} = req.params;
  const re = /^[a-z]{1,128}$/i
  if(re.test(username)) {
  // MAKE A REQUEST TO api.github.com AND PASS USERNAME 
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  const fetch_res = await fetch(requestURL);
  fetch_res.body.pipe(res);
  return;
  }
  res.status(404).send(' Sorry, we cannot find that User! (must be only letters)')
  // TAKE THE JSON FROM THE RESPONSE AND SEND IT TO THE CLIENT 

  // const read = async body => {
  //   await fetch(`https://api.github.com/users/${username}/repos?type=all&sort=updated`, {
  //   method: 'GET'
  // })
  //   .then(res => res.json())
  //   .then(json => console.log(json));
  // }
  // res.send(JSON.stringify(res.json()));

  // res.json({course: 'csc441', username}).end();

})

app.get('/ab+*e', (req, res)=>{
  res.send(`$req.url}\n`)
})

app.get(/^\/main~([a-z0-9]{8})\.([a-z0-9]{20})\.js(\.gz|\.LICENSE\.txta)?$/,(req, res)=>{
  console.log(`handler-1:${req.url}\n`)
})

app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  console.log('error: csrf token is invalid')
  // handle CSRF token errors here
  res.status(403).send('invalid data')
})

app.post('/signup', csrfProtection, (req, res) => {
  const body = req.body;
  console.log('signup:body: ', body)
  res.json(body)
})

app.post('/signin', csrfProtection, (req,res) => {
  const body = req.body;
  console.log('signin:body: ', body)
  res.json(body)
})

app.get('/argon2/:pw', async (req,res) => {
  const {pw} = req.params;
  console.log('pw: ', pw)
  try {
    const enc_pw = await argon2.hash(pw)
    console.log('enc_pw: ', enc_pw)
    const result = await client.setAsync(pw, en_pw);
    console.log('result: ', result)
    // res.json({ pw, enc_pw })
    // res.send( `${JSON.stringify({ pw, enc_pw })}\n`)
    res.send('OK\n')
  } catch (e) {
    res.sendStatus(500)
  }
})

// const enctmp123 = "$argon2i$v=19$m=4096, t=3,p=1$pMNKVUhKCL4NbUABWPXVgQ$8ZTz3NHldaxC+wyqVFetAkuR+4y2f/Rkdl+rBPmphVM"

app.get('/argon2/verify/:pw', async (req, res) => {
  const {pw} = req.params;
  console.log('pw: ', pw)
  try {
    console.log('client.getAsync: ', client.getAsync)
    const enc_pw = await client.getAsync(pw);
    console.log('enc_pw: ', enc_pw)
    const verified_pw = await argon2.verify(enc_pw, pw)
    if(verified_pw) {
      // res.json({pw, enc_pw})
      res.send(`${JSON.stringify({pw, verified_pw})}\n`)
    } else {
      res.send('you are a stranger!\n')
    }
  }catch (e) {
    console.log('/argon2/verify/:pw:Exception: ', e)
    res.sendStatus(500)
  }
})

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
  app.get('*', (req, res) => {
    console.log(`wildcard:${req.url}`)

    res.sendFile(path.resolve(outputPath, 'index.html'))
  });
} else {
  app.get('*', csrfProtection, (req, res) => {
    console.log('options: ', options)
    console.log('url: ', req.url)
    if(req.session.views) {
      req.session.views++
    } else {
      req.session.views = 1
    } console.log('session: ', req.session)
    const csrf_token = req.csrfToken()
    console.log('csrf_token: ', csrf_token)
    res.setHeader('X-CSRF-Token', csrf_token)
    const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
    fsInMem.readFile(path.join(outputPath, 'index.html'), (err, file) => {
      if (err) { console.log('err: ', err) }
      // console.log('file: ', file)
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString().replace("{{csrfToken}}", csrf_token));
      }
    });
  });
}

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
