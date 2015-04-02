#!/usr/bin/env node

// local
var convert = require('./lib/convert.js');

// cli
var program = require('commander');

program
  .version(require('./package.json').version)
  .usage('<command> [options] <file/URL> <output>')
  .option('-p, --prefix [name]', 'Add a prefix to the output')
  .option('-a, --append', 'Append to output file');

program.on('--help', function(){
  console.log('  Commands:');
  console.log('');
  console.log('    css      Convert to css');
  console.log('    termjs   Convert to term.js compatible css');
  console.log('    json     Convert to a json representation');
  console.log('    less     Convert to less variables');
  console.log('');
});

program.parse(process.argv);

// make sure command is well formed
if (program.args.length < 3) program.help();

var command = program.args[0]
  , input   = program.args[1]
  , output  = program.args[2];

// convert!
convert(
  input,
  output,
  command,
  {
    prefix: program.prefix,
    append: program.append
  },
  function(err) {
    if (err) {
      console.log('\nError converting:\n');
      console.log(err.message);
    }
  }
);
