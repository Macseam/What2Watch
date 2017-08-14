'use strict';

let fs = require('fs');
let path = require("path");
const ConcatSource = require('webpack-sources/lib/ConcatSource');
const SingleEntryDependency = require('webpack/lib/dependencies/SingleEntryDependency');

function HelloWorldPlugin(options) {
  if (options.styleDir) {
    this.styleDir = options.styleDir;
  }
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  const styleDir = this.styleDir;
  const styleFiles = fs.readdirSync(styleDir);

  compiler.plugin('make', function(compilation, done) {
    /*let textInjection = "@import url('https://fonts.googleapis.com/css?family=Pattaya');\n@import url('https://fonts.googleapis.com/css?family=Pattaya');";
    compilation.assets['somefile.css'] = {
      source: function() {
        return textInjection;
      },
      size: function() {
        return textInjection.length;
      }
    };*/

    compilation.plugin("before-chunk-assets", function() {
      console.log(Object.getOwnPropertyNames( compilation ));
      let textInjection = "\/**Sweet Banner**\/";
      compilation.modules['somefile.css'] = {
        source: function() {
          return textInjection;
        },
        size: function() {
          return textInjection.length;
        }
      };
      compilation.entries['somefile.css'] = {
        source: function() {
          return textInjection;
        },
        size: function() {
          return textInjection.length;
        }
      };
    });

    /*compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
      let textInjection = "\/**Sweet Banner**\/";
      compilation.assets[chunks[0].files[0]] = new ConcatSource(textInjection, "\n", compilation.assets[chunks[0].files[0]]);
      callback();
    });*/

    //fs.writeFileSync(path.join(styleDir, 'imported-fonts.css'), '/* Imported fonts */\n');
    /*styleFiles.map((styleFile)=>{
      let text = fs.readFileSync(path.join(styleDir, styleFile),'utf8');
      let foundText = text.match(/@import(.*?);/g);
      foundText = foundText.join('\n');
      fs.appendFileSync(path.join(styleDir, 'imported-fonts.css'), foundText);
    });
    const dep = new SingleEntryDependency(path.join(styleDir, 'imported-fonts.css'));
    compilation.addEntry(compiler.options.context, dep, 'imported-fonts.css', ()=>{console.log('font links added')});*/
    done();

  });

  /*compiler.plugin('done', function(compilation, callback) {
    fs.unlinkSync(path.join(styleDir, 'imported-fonts.css'));
  });*/
};

module.exports = HelloWorldPlugin;