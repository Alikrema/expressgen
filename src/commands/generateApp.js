const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');
const generatePackageJson = require('./generatePackageJson');

const generateApp = async (name, options) => {
  const folders = [
    'routers',
    'controllers',
    'services',
    'repos',
    'middlewares',
  ];

  if (options.all) {
    folders.push('models', 'helpers', 'tests', 'common', 'utils', 'validators');
  }

  const appDir = path.join(process.cwd(), name);
  await fs.ensureDir(appDir);

  const templatePath = path.join(__dirname, '../../templates/app.ejs');
  const outputPath = path.join(appDir, 'app.js');

  const template = await fs.readFile(templatePath, 'utf8');
  const content = ejs.render(template, { name });

  await fs.outputFile(outputPath, content);

  for (const folder of folders) {
    await fs.ensureDir(path.join(appDir, 'src', folder));
  }

  await fs.ensureDir(path.join(appDir, 'config'));
  await fs.ensureDir(path.join(appDir, 'db'));

  await generatePackageJson(name);

  console.log('App generated successfully.\n');
  console.log('Run the following command to start the app:\n');
  console.log(`cd ${name} && npm install && npm install && npm start`);
};

module.exports = generateApp;
