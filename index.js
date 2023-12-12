const repl = require('repl');
repl.start();

function getRandomNumber() {
    return Math.floor(Math.random() * 100);
}
console.log(getRandomNumber());
