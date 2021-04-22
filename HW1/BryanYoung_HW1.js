/*
 *  Bryan Young
 *  University of Southern Mississippi
 *  @start 2021.21.01
 * 
 *  Assignment 1
 *  
 */
 
const course_id = 'CSC441';
const section = 'H001';
const university = 'USM';
const term = 'spring_semester';
const year = 2021;

function CourseItem(props) {
    var yearPresent = false;
    if(typeof props === 'string'){
        console.log(props);
        return;
    }
    if(typeof props === 'object'){
        var keys = Object.keys(props);
        for(let i = 0; i < keys.length; i++){
            if(keys[i] === 'year'){
                yearPresent = true;
            }
            console.log(keys[i], ":", props[keys[i]]);
        }
        if(yearPresent){
            var year = props['year'];
            var newObject = {};
            newObject[year] = props;
            return newObject;
        }
    }
    }
    let arr = [1, 2, 3].map(function(item) {
        return CourseItem({
            course_id,
            section: 'H00'+item,
            university,
            term,
            year
        })
    })
console.log(arr);

const status = (course) => { 
    if(course.year < 2020)
        console.log("pre Covid");
    else if(course.year > 2021)
        console.log("post Covid");
    else   
        console.log("in Covid Pandemic");

    if(course.university === "USM")
        console.log("Hattiesburg");
    else if(course.university === "MSU")
        console.log("Starkville");
    else if(course.university === "UM")
        console.log("Oxford");

    console.log(course.term);
    console.log(course.course_id);
    console.log(course.section);
}

status({year, university, term, course_id, section});