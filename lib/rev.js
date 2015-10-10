/**
 * @file edp rev module
 * @author junmer
 */


var edp = require('edp-core');
var helper = require('edp-build/lib/helper');
var path = require('path');

function prepareFileMap(files, baseDir) {

    var baseReg = new RegExp('^' + baseDir + '/');
    var jsReg = /\.js$/;
    var md5Reg = /\.(\w+)\.js$/;

    var filePath;
    var map = {};

    files.forEach(function (file) {
        filePath = file.path.replace(baseReg, '');
        map[filePath.replace(md5Reg, '')] = filePath.replace(jsReg, '');
    });

    return map;
}


function replaceConfig (moduleCombineConfigs, fileMap, prefix) {

    var config = {};

    var fullPath;

    Object.keys(moduleCombineConfigs).forEach(function (key) {

        fullPath = prefix ? path.resolve(prefix, key) : key;

        if (typeof moduleCombineConfigs[key] === 'object') {
            config[key] = replaceConfig(moduleCombineConfigs[key], fileMap, fullPath);
            return;
        }

        var value = moduleCombineConfigs[key];
        var md5Path = fileMap[fullPath];

        if (md5Path) {

            if (prefix) {
                md5Path = md5Path.replace(new RegExp('^' + prefix + '/'), '');
            }

            config[md5Path] = value;
        }
        else {
            config[key] = value;
        }

    });

    return config;
}


function getCombineConfig(moduleCombineConfigs) {

    var baseDir = 'src';

    var fileMap = prepareFileMap(this.processFiles, baseDir);

    var config = replaceConfig(moduleCombineConfigs, fileMap);

    return config;
}

module.exports.getCombineConfig = getCombineConfig;
