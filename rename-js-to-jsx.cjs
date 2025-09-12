// rename-js-to-jsx.cjs
const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "src");

function renameFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameFiles(fullPath);
    } else if (file.endsWith(".js")) {
      const newPath = fullPath.replace(/\.js$/, ".jsx");
      fs.renameSync(fullPath, newPath);
      console.log(`Renamed: ${fullPath} -> ${newPath}`);
    }
  });
}

renameFiles(folder);
console.log("Todos los archivos .js fueron renombrados a .jsx");
