const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');
const addRouter = require('../helpers/addRouter');
const pluralize = require('pluralize');

const toCamelCase = (str) => {
  return str
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

const generateModule = async (name) => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  const singularName = pluralize.singular(name.toLowerCase());
  const singularCamelCaseName = toCamelCase(singularName);

  if (!(await fs.pathExists(packageJsonPath))) {
    console.error(
      'Error: This command must be run from a folder that contains a package.json file (a valid Node.js project).'
    );
    process.exit(1);
  }

  const routerTemplatePath = path.join(__dirname, '../../templates/router.ejs');
  const controllerTemplatePath = path.join(
    __dirname,
    '../../templates/controller.ejs'
  );
  const serviceTemplatePath = path.join(
    __dirname,
    '../../templates/service.ejs'
  );
  const repoTemplatePath = path.join(__dirname, '../../templates/repo.ejs');

  const routerPath = path.join(
    process.cwd(),
    'src',
    'routers',
    `${singularName}Router.js`
  );
  const controllerPath = path.join(
    process.cwd(),
    'src',
    'controllers',
    `${singularName}Controller.js`
  );
  const servicePath = path.join(
    process.cwd(),
    'src',
    'services',
    `${singularName}Service.js`
  );
  const repoPath = path.join(
    process.cwd(),
    'src',
    'repos',
    `${singularName}Repo.js`
  );

  const routerTemplate = await fs.readFile(routerTemplatePath, 'utf8');
  const controllerTemplate = await fs.readFile(controllerTemplatePath, 'utf8');
  const serviceTemplate = await fs.readFile(serviceTemplatePath, 'utf8');
  const repoTemplate = await fs.readFile(repoTemplatePath, 'utf8');

  const routerContent = ejs.render(routerTemplate, {
    singularName,
    singularCamelCaseName,
  });
  const controllerContent = ejs.render(controllerTemplate, {
    singularName,
    singularCamelCaseName,
  });
  const serviceContent = ejs.render(serviceTemplate, {
    singularName,
    singularCamelCaseName,
  });
  const repoContent = ejs.render(repoTemplate, {
    singularName,
    singularCamelCaseName,
  });

  await fs.ensureDir(path.join(process.cwd(), 'src'));
  await fs.ensureDir(path.join(process.cwd(), 'src', 'routers'));
  await fs.ensureDir(path.join(process.cwd(), 'src', 'controllers'));
  await fs.ensureDir(path.join(process.cwd(), 'src', 'services'));
  await fs.ensureDir(path.join(process.cwd(), 'src', 'repos'));

  await fs.outputFile(routerPath, routerContent);
  await fs.outputFile(controllerPath, controllerContent);
  await fs.outputFile(servicePath, serviceContent);
  await fs.outputFile(repoPath, repoContent);

  // await addRouter(name);

  console.log(`${name} module generated successfully.`);
  console.log(
    'Please add the following code to src/app.js: to register the module router'
  );
  console.log(`const ${name}Router = require('./routers/${name}Router');\n`);
  console.log(`app.use('/${name}', ${name}Router);`);
};

module.exports = generateModule;
