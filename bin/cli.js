#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();
const generateApp = require('../src/commands/generateApp');
const generateModule = require('../src/commands/generateModule');

program
  .command('app <name>')
  .description('Generate a new app')
  //FIXME: options not working
  .option('-a, --all', 'Generate an app with all extra folders')
  .action((name, options) => {
    generateApp(name, options);
  });

program
  .command('module <name>')
  .description('Generate a new module')
  .action((name) => {
    generateModule(name);
  });

program.parse(process.argv);
