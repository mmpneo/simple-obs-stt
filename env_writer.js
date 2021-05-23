const fs = require('fs');
const targetPath    = `./src/environments/environment.${process.env.BUILD_ENV}.ts`;
fs.readFile(targetPath, 'utf8', (err, data) => {
  const rew = data
    .replace('{{CLIENT_ID}}', process.env.TW_CLIENT)
    .replace('{{SERVER_HOST}}', process.env.SERVER_HOST)
  fs.writeFile(targetPath, rew, function (err) {
    if (err) {
      throw console.error(err);
    } else {
      console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
    }
  });
});

