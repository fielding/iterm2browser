// node
var fs = require('fs');

// npm
var request = require('request');

// local
var icolors = require('./iterm-colors'), // adapted from npm
    templates = require('./templates');

// Hold options / error callback
var opts, onComplete, outputFile;

function convert(input, output, cmd, flags, cb) {
  type       = cmd;
  opts       = flags;
  outputFile = output;
  onComplete = cb;

  // if input is file
  if (fs.existsSync(input)) {
    convertColors(fs.readFileSync(input));
    return;
  }

  // if input is URL
  request(input, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return onComplete(new Error('Error fetching URL or reading file...'));
    }
    convertColors(body);
  });
}

// iterm data -> hex values -> template
function convertColors(data) {
  var ansiColors;
  try {
    ansiColors = icolors(data);
  } catch(err) {
    return onComplete(new Error('Error converting iterm file...'));
  }

  // write rendered template to file
  var t = templates[type];

  if (typeof t === 'undefined') {
    var msg = "There isn't a template for '"+type+"' yet, did you mistype?";
    return onComplete(new Error(msg));
  }

  write( t.render({
      prefix: opts.prefix,
      c:      ansiColors,
    })
  );
}

// write contents to file
function write(contents) {
  try {
    (opts.append)
      ? fs.appendFileSync(outputFile, contents)
      : fs.writeFileSync(outputFile, contents);
  } catch (err) {
    onComplete(new Error('\nError writing contents to file...\n'));
  }

  // all done, no errors!
  onComplete();
}

//
// Export
//

module.exports = convert;