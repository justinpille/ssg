var fs = require("fs");
var marked = require("marked");

readFiles("./pages/", write, err => {
  if (err) throw err;
  console.log("Read!");
});

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) throw err;
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, "utf-8", function(err, content) {
        if (err) throw err;
        onFileContent(filename, content);
      });
    });
  });
}

function write(filename, content) {
  var newFilename = basename(filename) + ".html";
  var html = marked(content);
  fs.writeFile("./dist/" + newFilename, html, err => {
    if (err) throw err;
    console.log("Done!");
  });
}

function basename(file) {
  const dotIndex = file.lastIndexOf(".");
  return file.substring(0, dotIndex);
}

function extension(file) {
  const dotIndex = file.lastIndexOf(".");
  return file.substring(dotIndex);
}
