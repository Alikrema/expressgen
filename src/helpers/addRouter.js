const fs = require('fs-extra');
const path = require('path');

const addRouter = async (name) => {
  const filePath = path.join(process.cwd(), 'app.js');
  const routerImport = `const ${name}Router = require('./src/routes/${name}Router');\n`;
  const routerUse = `app.use('/${name}', ${name}Router);\n`;

  try {
    if (!fs.existsSync(filePath)) {
      throw new Error('app.js not found in the root directory.');
    }
    let fileContent = await fs.readFile(filePath, 'utf8');

    if (!fileContent.includes(routerImport)) {
      fileContent = routerImport + fileContent;
    }

    if (!fileContent.includes(routerUse)) {
      const exportIndex = fileContent.lastIndexOf('module.exports');
      if (exportIndex !== -1) {
        fileContent =
          fileContent.slice(0, exportIndex) +
          routerUse +
          fileContent.slice(exportIndex);
      } else {
        fileContent += routerUse;
      }
    }

    await fs.writeFile(filePath, fileContent, 'utf8');
    console.log(`Route for ${name} added successfully in app.js.`);
  } catch (error) {
    console.error(`Failed to add route for ${name} in app.js:`, error);
  }
};

module.exports = addRouter;
