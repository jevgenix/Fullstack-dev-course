/*
 * Program creates folder and if folder exists already, file will be deleted
 */

const fs = require("fs");
// create a newdata directory
fs.mkdir("newdata", true, (err) => {
  if (err) {
    console.log(
      "\nThis folder already exists, so it will be deleted" +
        "\nYou can create file again by running same program"
    );
    // In future versions of Node.js, fs.rmdir(path, { recursive: true }) will be removed.
    // Use fs.rm(path, { recursive: true }) instead
    fs.rm("newdata", { recursive: true }, () => {
      console.log("Folder Deleted");
    });
  } else {
    console.log("Directory was created successfully");
    // let's write file there :)
    fs.writeFile(
      "newdata/new_data_file.txt",
      "This is a new data file!",
      (err) => {
        if (err) throw "Something went wrong";
        console.log("File was created successfully");
      }
    );
  }
});
