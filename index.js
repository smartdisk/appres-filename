'use strict';

const _truncate = require("truncate-utf8-bytes");

const _illegalRe = /[\/\?<>\\:\*\|"]/g;
const _controlRe = /[\x00-\x1f\x80-\x9f]/g;
const _reservedRe = /^\.+$/;
const _windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
const _windowsTrailingRe = /[\. ]+$/;
function _validate(filename, replace){
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
class _FileName { }
_FileName.prototype.validate = (filename, options) => {
    let lastsp = filename.lastIndexOf("/");
    if(lastsp>=0) filename = filename.substring(lastsp);
    let replace = (options && options.replace) || '';
    let output = _validate(filename, replace);
    if (replace === '') {
      return output;
    }
    return _validate(output, '');  
}
const FileName = new _FileName();
module.exports = FileName;

// console.log(FileName.validate("../../.some_file_name.txt."));