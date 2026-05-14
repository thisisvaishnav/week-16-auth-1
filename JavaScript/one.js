// Asynchronous code, callbacks


// below is the example of asynchronous code, callbacks
function run() {
	console.log("I will run after 1s");
}

setTimeout(run, 1000);
console.log("I will run immedietely");


// Promise in js is an object that reporesents the eventual completion of an 
// asynchronous operation and its resulting value. 
// promisses are used to handle asynchromous operation more effectively than
// traditional callbacks function, porviding a clearner and more readable code.
// Promise states:
// 1. Pending: Initial state, neither fulfilled nor rejected.
// 2. Fulfilled: Operation completed successfully.
// 3. Rejected: Operation failed.   


function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function callback() {
      console.log("3 seconds have passed");
  }
  

// this is the better way to write asynchronous code using promises
setTimeoutPromisified(3000).then(callback)

// this is the traditional way to write asynchronous code using callbacks
setTimeout(callback, 3000);


const fs = require('fs');

function fsReaPromisified(fileURLToPath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileURLToPath, encoding, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function callback(data) {
    console.log(data);
}

function callbackError(err) {
    console.log(err);
}

fsReadPromisified('file.txt', 'utf8')
    .then(callback)
    .catch(callbackError);
<<<<<<< HEAD



    // Async/await is a syntactical sugar over promises that makes asynchronous code 
    // look and behave more like synchronous code.


    async function fsReadPromisified(fileURLToPath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileURLToPath, encoding, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

    async function readfile() {
        try {
            const data = await fsReadPromisified('file.txt', 'utf8');
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
=======
    .then( () => {
        console.log("file read successfully");
    } )
    .catch( (err) => {
        console.log(err);
    } );
>>>>>>> 3a8fdaa (push to main branch)
