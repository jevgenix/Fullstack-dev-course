// now we can delete our merged file!
const fs = require("fs");

// file deleting happen with unlink function
// But I want to chose file with terminal, this is why we need readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Which file you want to delete?", function (file_name) {
  rl.question("Where this file is located?", function (file_location) {
    fs.unlink(`${file_location}/${file_name}`, (err) => {
      if (err) throw err;
      console.log(`${file_name} deleted successfully`);
    });
    rl.close();
  });
});

/*
 * we can also add somethin on readline close:
 * rl.on("close", function () {
 * console.log("Something");
 *  process.exit(0);
 * });
 */

/*
 * File deleting manually is much easier, here is a syntax:
 * fs.unlink('path_to_file/file.txt', (err) => {
 * if (err) throw err;
 * console.log("File is deleted.");
 * });
 */
