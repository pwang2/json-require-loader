var path = require('path');
var fs = require('fs');
var loaderUtils = require('loader-utils');

module.exports = function magic(source, isrecur, curfilepath) {
    var srcFile;
    if (!curfilepath) {
        var rawRequest = loaderUtils.getCurrentRequest(this);
        this.cacheable && this.cacheable();
        srcFile = rawRequest.split('!').pop();
    } else {
        srcFile = curfilepath;
    }
    var modsrc = `var r=function(v){
        var reqfile=path.join(path.dirname(srcFile),v);
            var reqsrc=fs.readFileSync(reqfile,'utf8');
            if(v.endsWith('.json')){
                return JSON.parse(reqsrc);
            }else{
                return magic(reqsrc,true,reqfile);
            }
        };result=` + source;
    console.log(modsrc);
    var result = eval(modsrc);
    console.log(result);
    if (isrecur) {
        return result;
    } else {
        return 'module.exports=' + JSON.stringify(result);
    }
}
