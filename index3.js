//task1
class EventEmitter {
    
    constructor() {
        this.listeners = {};
    }

    addListener(eventName, fn) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(fn);
    }

    on(eventName, fn) {
        this.addListener(eventName, fn);
    }

    removeListener(eventName, fn) {
        if (this.listeners[eventName]) {
            this.listeners[eventName] = this.listeners[eventName].filter(listener => listener !== fn);
        }
    }

    off(eventName, fn) {
        this.removeListener(eventName, fn);
    }

    once(eventName, fn) {
        const onceWrapper = (...args) => {
            fn(...args);
            this.off(eventName, onceWrapper);
        };
        this.on(eventName, onceWrapper);
    }

    emit(eventName, ...args) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(fn => {
                fn(...args);
            });
        }
    }

    listenerCount(eventName) {
        return this.listeners[eventName] ? this.listeners[eventName].length : 0;
    }

    rawListeners(eventName) {
        return this.listeners[eventName] || [];
    }
   } 

//task2
class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        const startTime = Date.now();
        const data = await asyncFunc(...args);
        this.emit('data', data);
        this.emit('end', Date.now() - startTime);
    }
}

//task3
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const csvDirectory = './csv';
const outputTxtFile = 'output.txt';

const csvFiles = fs.readdirSync(csvDirectory).filter(file => file.endsWith('.csv'));

if (csvFiles.length === 0) {
  console.error(`No CSV files ${csvDirectory}.`);
  process.exit(1);
}

const csvFilePath = path.join(csvDirectory, csvFiles[0]);
const outputFilePath = path.join(__dirname, outputTxtFile);

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(outputFilePath);

readStream
  .pipe(csv())
  .on('data', (jsonObj) => {
    writeStream.write(jsonObj.toString() + '\n');
  })
  .on('error', (error) => {
    console.error('Error', error);
  });

writeStream.on('error', (error) => {
  console.error('Error', error);
});

 //1  
//    const myEmitter = new EventEmitter();
   
//    function c1() {
//        console.log('an event occurred!');
//    }
   
//    function c2() {
//        console.log('yet another event occurred!');
//    }
   
//    myEmitter.on('eventOne', c1); // Register for eventOne
//    myEmitter.on('eventOne', c2); // Register for eventOne
   
// //    Register eventOnce for one time execution
//    myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
//    myEmitter.once('init', () => console.log('init once fired'));
   
//    // Register for 'status' event with parameters
//    myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));
   
   
//    myEmitter.emit('eventOne');
   
//    // Emit 'eventOnce' -> After this the eventOnce will be
//    // removed/unregistered automatically
//    myEmitter.emit('eventOnce');
   
//    myEmitter.emit('eventOne');
//    myEmitter.emit('init');
//    myEmitter.emit('init'); // Will not be fired
//    myEmitter.emit('eventOne');
//    myEmitter.emit('status', 200, 'ok');
   
//    // Get listener's count
//    console.log(myEmitter.listenerCount('eventOne'));
   
//    // Get array of rawListeners//
//    // Event registered with 'once()' will not be available here after the
//    // emit has been called
//    console.log(myEmitter.rawListeners('eventOne'));
   
//    // Get listener's count after remove one or all listeners of 'eventOne'
//    myEmitter.off('eventOne', c1);

//    console.log(myEmitter.listenerCount('eventOne'));
//    myEmitter.off('eventOne', c2);
//    console.log(myEmitter.listenerCount('eventOne'));

//2 Usage example
// const withTime = new WithTime();
// withTime.on('begin', () => console.log('About to execute'));
// withTime.on('end', duration => console.log(`Done with execute in ${duration}ms`));
// withTime.on('data', data => console.log(data));

// withTime.execute(async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//     return response.json();
// });
