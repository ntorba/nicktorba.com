const fs = require("fs");
const path = require("path");

let notesDirectory = "content/brain/";
let notesFileExtensions = [
    ".md",
    ".mdx",
];

let nodes = [];

const recursive = directory => fs.readdirSync(directory).map(filename => {
        let slug = path.parse(filename).name.toLowerCase();
        let fullPath = path.join(directory, filename);
        console.log("FULLPATH");
        console.log(fullPath);
        if (fs.lstatSync(fullPath).isDirectory()) {
            recursive(fullPath)
        }else if (notesFileExtensions.includes(path.extname(filename).toLowerCase())){
            let rawFile = fs.readFileSync(fullPath, "utf-8");
            nodes.push({
                filename: filename,
                fullPath: fullPath,
                slug: slug,
                rawFile: rawFile,
            });
        }
    })

recursive(notesDirectory);
console.log(nodes);

// let filenames = fs.readdirSync(notesDirectory);
// // console.log("FILENAMES")
// // console.log(filenames)
// const f = filenames
//     .filter((filename) => {
//         return notesFileExtensions.includes(path.extname(filename).toLowerCase());
//     })
//     .map((filename) => {
//     let slug = path.parse(filename).name.toLowerCase();
  
//     let fullPath = notesDirectory + filename;
//     let rawFile = fs.readFileSync(fullPath, "utf-8");
  
//       return {
//         filename: filename,
//         fullPath: fullPath,
//         slug: slug,
//         // rawFile: rawFile,
//       };
//     });

//console.log(f);