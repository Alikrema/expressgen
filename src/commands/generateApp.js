const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');

const generateApp = async (name, options) => {
  const folders = [
    'routers',
    'controllers',
    'services',
    'repos',
    'middlewares',
  ];
  if (options.all) {
    folders.push([
      'models',
      'helpers',
      'tests',
      'common',
      'utils',
      'validators',
    ]);
  }
  const templatePath = path.join(__dirname, '../../templates/app.ejs');
  const outputPath = path.join(process.cwd(), `app.js`);

  const template = await fs.readFile(templatePath, 'utf8');
  const content = ejs.render(template, { name });

  await fs.outputFile(outputPath, content);

  for (const folder of folders) {
    await fs.ensureDir(path.join('src', folder));
  }

  await fs.ensureDir('config');
  await fs.ensureDir('db');
};

module.exports = generateApp;
