const EventEmitter = require('events');
const {EvenEmitter} = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('abc', () => {
    console.log('event abc handler-1')
});
myEmitter.emit('abc', 10); // event abc handeler 1

myEmitter.on('abc', (i) => {
    console.log('event abc handler-1', i)
});
myEmitter.emit('abc', 10); // event abc handler -1 10

myEmitter.on('abc', ({i}) => {
    console.log('event abc handler-1', i)
});
myEmitter.emit('abc', {i:10, j:25}); // event ... 10

myEmitter.on('abc', ({j}) => {
    console.log('event abc handler-2', j)
});
myEmitter.emit('abc', {i:10, j:25});
myEmitter.emit('abc', {i:100, j:205});
// handler-1 10, handler-2 25, handler-1 100, handler-2 205

console.log(myEmitter.getMaxListeners()); // 10
myEmitter.on('def', ({k}) => {
    console.log('event def handler-1', k) 
});
myEmitter.emit('def', {k:{i=10, j:25}}); // event ... {i:10, j:25}

myEmitter.emit('def', {K:{i=101, j=251}}); // no output

myEmitter.on('def', ({k}) => {
    console.log('event def handler-1', k)
});

myEmitter.on('def', function({k}) {
    console.log('event def handler-1', k, this) 
}); // returns Emitter object instead of empty object

console.log(myEmitter.listenerCount('abc')); // 2
console.log(myEmitter.listenerCount('def')); // 1
console.log(myEmitter.eventNames()); // ['abc', 'def']
console.log(myEmitter.listeners('abc')); // [function(anon)], [func ...]

myEmitter.once('def', function({k}) {
    console.log('event def handler-1', k)
});
myEmitter.emit('def', {K:{i:101, j:251}}); // ... {i:101, j:251}
myEmitter.emit('def', {k:{i:10, j:25}}); // no output
console.log('listener count for def:', myEmitter.listenerCount('def')); // 0