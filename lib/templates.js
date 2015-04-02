var fs = require('fs'),
    path = require('path'),
    Hogan = require('hogan');

// evil eval, get compile templates and make them requirable
var compiled = path.join(__dirname, './templates/compiled.js');
eval( fs.readFileSync(compiled, 'utf-8') );

module.exports = templates;