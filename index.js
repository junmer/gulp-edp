/**
 * @file gulp edp
 * @author junmer
 */


var through = require('through2');
var gutil = require('gulp-util');
var edp = require('edp-core');
var eutil = edp.util;
var ProcessContext = require('edp-build/lib/process-context');
var FileInfo = require('edp-build/lib/file-info');
var build = require('./lib/build');


module.exports = function (options) {
    'use strict';

    var gulpCwd = process.cwd();

    var processOptions = eutil.extend({
        input: gulpCwd,
        baseDir: gulpCwd,
        output: gulpCwd,
        injectProcessor: function (processors) {

            var me = this;
            Object.keys(processors).forEach(function (key) {
                me[key] = processors[key];
            });

        },
        getProcessors: function () {
            return [];
        }
    }, options);


    var processContext = new ProcessContext(processOptions);

    function start(file, encoding, callback) {

        var relativePath = edp.path.relative(processContext.baseDir, file.path);

        var fileData = new FileInfo({
            data: file.contents,
            extname: edp.path.extname(file).slice(1),
            path: relativePath,
            fullPath: file.path,
            fileEncoding: encoding
        });

        processContext.addFile(fileData);

        callback();
    }

    function end(callback) {

        var me = this;

        build(processContext, processOptions, function (outputs) {

            outputs.forEach(function (file) {

                if (file.outputPath) {

                    var fileBuffer = file.getDataBuffer();
                    file.outputPaths.push(file.outputPath);

                    file.outputPaths.forEach(function (outputPath) {

                        var outputFile = edp.path.resolve(processOptions.output, outputPath);

                        var vinylFile = new gutil.File({
                            path: outputFile,
                            contents: fileBuffer
                        });

                        me.push(vinylFile);

                    });
                }


            });

            callback();
        });

    }

    return through.obj(start, end);
};
