const { Command } = require('commander');
const program = new Command();

program
  .name('gendiff')
  .version('1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')

program.parse();