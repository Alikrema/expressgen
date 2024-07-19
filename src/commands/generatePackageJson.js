const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');

const generatePackageJson = async (projectName) => {
  const templatePath = path.join(__dirname, '../../templates/packagejson.ejs');
  const outputPath = path.join(process.cwd(), projectName, 'package.json');

  const template = await fs.readFile(templatePath, 'utf8');
  const content = ejs.render(template, { projectName });

  await fs.outputFile(outputPath, content);
  console.log(`package.json for ${projectName} generated successfully.`);
};

module.exports = generatePackageJson;
