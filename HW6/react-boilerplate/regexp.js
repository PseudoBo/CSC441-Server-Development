let str = 'main~17c7bba1.d933c72ec87617ad31ed.js'

let re = /^main~([a-b0-9]{8})\.([a-b0-9]{20})\.js(\.gz)?$/

console.log(re.test(str))