# iterm2browser

iterm2browser is a command line tool to convert iterm color schemes to styles you can use in the browser. It outputs css, json, and less variables.

There are 2 types of css output. The first is formatted to be used with [ansi_up](https://github.com/drudru/ansi_up/). The second is formatted to be used with [term.js](https://github.com/chjj/term.js) / [tty.js](https://github.com/chjj/tty.js/)

iterm2browser is basically a wrapper around [iterm-colors](https://www.npmjs.com/package/iterm-colors) that outputs to template files.

You can find some converted styles [here](https://github.com/demille/ansi-browser-styles) with a [demo](https://demille.github.io/ansi-browser-styles) of them in action.

### Install
```
npm install -g iterm2browser
```

### Usage

```
Usage: iterm2browser <command> [options] <file/URL> <output>

Options:

  -h, --help           output usage information
  -V, --version        output the version number
  -p, --prefix [name]  Add a prefix to the output
  -a, --append         Append to output file

Commands:

  css      Convert to css
  termjs   Convert to term.js compatible css
  json     Convert to a json representation
  less     Convert to less variables
```

The prefix command is useful for adding css classes to styles. See output format below.

The append flag will append styles to the output file. Without, it will write over the output file.


### Examples
```
iterm2browser css cobalt2.itermcolors cobalt2.css

iterm2browser css --append ir_black.itermcolors styles.css

iterm2browser less http://github.com/that/style/there that.less
```

### Output Formats

**CSS Output** <br/>
Provides these styles: <br/>
- `.fg`
- `.bg`
- `::selection`
- `.ansi-{color}-fg`, `.ansi-{color}-bg`, `.ansi-bright-{color}-fg`, and `.ansi-bright-{color}-bg` for black, red, green, yellow, blue, magenta, cyan, and white

Prefixes are applied this pattern: `{{ prefix }} .fg`

So `iterm2browser css --prefix=".cobalt2" cobalt2.itermcolors cobalt2.css` would output: `.cobalt2 .fg {...}`


**Termjs Output** <br/>
You can set termjs colors when you start a terminal with json, but how do you change it on the fly, whenever you want? Nasty hacks, thats how. Termjs css output looks like this: <br/>
`{{ prefix }} span[style*=";color:#eeeeec;"] {color: {{ theme_color }} !important;}`

It works by overriding the default inline styles termjs sets for fg and bg colors. Nasty. It also provides .fg and .bg like the normal css output.

**JSON Output** <br/>
Follows this pattern (without the outer prefix level if it is omitted):
```json
{
  "{{prefix}}": {
    "fg":            "{{ c.foreground }}",
    "bg":            "{{ c.background }}",
    "black":         "{{ c.palette.0 }}",
    "red":           "{{ c.palette.1 }}",
    "green":         "{{ c.palette.2 }}",
    "yellow":        "{{ c.palette.3 }}",
    "blue":          "{{ c.palette.4 }}",
    "magenta":       "{{ c.palette.5 }}",
    "cyan":          "{{ c.palette.6 }}",
    "white":         "{{ c.palette.7 }}",
    "brightBlack":   "{{ c.palette.8 }}",
    "brightRed":     "{{ c.palette.9 }}",
    "brightGreen":   "{{ c.palette.10 }}",
    "brightYellow":  "{{ c.palette.11 }}",
    "brightBlue":    "{{ c.palette.12 }}",
    "brightMagenta": "{{ c.palette.13 }}",
    "brightCyan":    "{{ c.palette.14 }}",
    "brightWhite":   "{{ c.palette.15 }}"
  }
}
```

**LESS Output** <br/>
Outputs color variables you can use elsewhere. <br/>
Follows this format: `@{{prefix}}brightRed` using the same variable names as the JSON output.

### Custom Formats

If you want to add or change a format, you can add or edit a .mustache template in lib/templates.  Compile the template with the [Hogan](http://twitter.github.io/hogan.js/)'s hulk command:

```
hulk *.mustache > compiled.js
```

If your template was named mine.mustache, you would then run iterm2browser with the `mine` command:

```
iterm2browser mine cobalt2.itermcolors cobalt2.css
```

## License

The MIT License (MIT)

Copyright (c) 2015 Sterling DeMille &lt;sterlingdemille@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.