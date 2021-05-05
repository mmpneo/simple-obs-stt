const fs = require('fs');
const util = require('util');
(async () => {
  const file = await util.promisify(fs.readFile)('./dist/index.html', "utf8");
  console.log(file.replace(/<base href.*">/, "<base href=\"/\">"));
})();
