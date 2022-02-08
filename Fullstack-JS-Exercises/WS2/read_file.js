// documentation : https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_file_system
// Add a file system module
const fs = require("fs");
console.log("File reading program started");

// reading file using non-blocking, event driven method
var data = fs.readFileSync("text_files/example.txt");
console.log(data.toString());

// using the traditional blocking way
// name callback function, will define it later
fs.readFile("text_files/example.txt", results);

// Introduce a function to deal with fileread results
function results(err, data) {
  if (err) return console.error(err);
  console.log("Results of fileread:");
  console.log(data.toString());
}

/**
 * Second possible outcome is:
 * fs.readFile('/etc/passwd', (err, data) => {
 *  if (err) throw err;
 *  console.log("Results of fileread:");
 *  console.log(data.toString());
}); */

for (var i = 0; i < 5; i++) {
  console.log("Node just keeps on going while the file is being processed");
}

console.log("Program Ended");

/**
 * So what is the difference between readFile and readFileSync ?
 * readFileSync is synchronous operation and readFile is asynchronous
 * The difference between synchronous and asynchronous operations is that:
 * When you execute something synchronously, you wait for it to finish before moving on to another task.
 * When you execute something asynchronously, you can move on to another task before it finishes.
 * During this example you can notice differnce between sync and async by executing this file
 */
