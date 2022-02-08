// documentation : https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_writefilesync_file_data_options
// Add a file system module
const fs = require("fs");
console.log("File creating and writing program started");

var first_data =
  "Greetings!\nThis is new textfile created using create_file.js\n" +
  "You can add some content here using add_content.js\n" +
  "Remember to delete me after using delete_file.js\n";

var second_data = "Just for testing purposes!\nHello, world!";

// Let's create our first_data file
fs.writeFileSync("text_files/first_data.txt", first_data);

// we can create new text file, or we can append second_data
// variable to our first_data file ;)
fs.appendFileSync("text_files/first_data.txt", second_data);

// now lets read our new file!
fs.readFile("text_files/first_data.txt", (err, data) => {
  if (err) throw err;
  console.log("Results of fileread:\n");
  console.log(data.toString());
  console.log("\n\nEnd of program.");
});

// We can also modify our program that it will read two different files
const txt_files = ["text_files/first_data.txt", "text_files/example.txt"];
for (let i = 0; i < txt_files.length; i++) {
  let results = fs.readFileSync(txt_files[i]);
  console.log(results.toString());
}
// with same technic we can merge wthis files into one
