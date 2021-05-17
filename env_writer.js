const fs = require('fs');

const targetPath    = './src/environments/environment.prod.ts';
const envConfigFile = `export const environment = {
    tw_client: '${process.env.TW_CLIENT}',
    production: true,
    localhostClientPath: 'http://localhost:3030',
    remoteClientPath: 'https://mmpneo.github.io/simple-obs-stt'
};
`;

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
  }
});
