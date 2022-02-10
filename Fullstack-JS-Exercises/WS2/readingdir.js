// Output directory contents to the terminal
const fs = require("fs");

// we can loop with forEach func
fs.readdir(__dirname, (err, files) => {
  if (err) throw err;
  console.log("\nCurrent directory contents:");
  files.forEach((file) => {
    console.log(file);
  });
});

// or we can simply use FOR loop
fs.readdir("text_files", (err, files) => {
  if (err) throw err;
  console.log("\ntext_files directory contents:");
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
  }
});

// Both work well, but forEach is just more lowcode func to use.
