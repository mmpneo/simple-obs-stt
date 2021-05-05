const fs = require('fs');
const util = require('util');
(async () => {
  const file = await util.promisify(fs.readFile)("./dist/index.html", "utf8");
  const str = file.replace(/<base href.*">/, "<base href=\"/\">");
  fs.writeFileSync("./dist/index.html", str)
})();
