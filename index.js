'use strict';

const _truncate = require("truncate-utf8-bytes");

Object.defineProperty(exports, "__esModule", { value: true });
var FileName = /** @class */ (function () {

  const _illegalRe = /[\/\?<>\\:\*\|"]/g;
  const _controlRe = /[\x00-\x1f\x80-\x9f]/g;
  const _reservedRe = /^\.+$/;
  const _windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
  const _windowsTrailingRe = /[\. ]+$/;
  
  function FileName() {
  }
  
  function _valid(filename, replace){
    if (typeof filename !== 'string') {
      throw new Error('Not string.');
    }
    let valid = filename
      .replace(_illegalRe, replace)
      .replace(_controlRe, replace)
      .replace(_reservedRe, replace)
      .replace(_windowsReservedRe, replace)
      .replace(_windowsTrailingRe, replace);
    while(valid.indexOf("..")>=0) {
        valid = valid.replace("..", ".");
    }
    return _truncate(valid, 255);
  }

  FileName.prototype.valid = function(filename, options){
    let lastsp = filename.lastIndexOf("/");
    if(lastsp>=0) filename = filename.substring(lastsp);
    let replace = (options && options.replace) || '';
    let output = _valid(filename, replace);
    if (replace === '') {
      return output;
    }
    return _valid(output, '');  
  };

  FileName.fileName = new FileName();
  FileName.valid = function(filename, options) {
    return this.fileName.valid(filename, options);
  };

  return FileName;
}());

module.exports = FileName;
module.exports.FileName = FileName;

// console.log(FileName.valid("../../.some_file_name.txt."));