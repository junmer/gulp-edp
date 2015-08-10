/**
 * @file edp build fake
 * @author junmer
 */


var edp = require('edp-core');

var ProcessorBase = require('edp-build/lib/processor/abstract');

/**
 * noop
 */
function noop() {}

/**
 * 向配置模块里注入构建处理器
 *
 * @inner
 * @param {Object} conf 配置模块
 */
function injectProcessor(conf) {
    if (conf && conf.injectProcessor) {
        conf.injectProcessor({
            AbstractProcessor   : ProcessorBase,
            MD5Renamer          : require('edp-build/lib/processor/md5-renamer'),
            Html2JsCompiler     : require('edp-build/lib/processor/html2js-compiler'),
            StylusCompiler      : require('edp-build/lib/processor/stylus-compiler'),
            HtmlMinifier        : require('edp-build/lib/processor/html-minifier'),
            JsCompressor        : require('edp-build/lib/processor/js-compressor'),
            CssCompressor       : require('edp-build/lib/processor/css-compressor'),
            LessCompiler        : require('edp-build/lib/processor/less-compiler'),
            PathMapper          : require('edp-build/lib/processor/path-mapper'),
            ModuleCompiler      : require('edp-build/lib/processor/module-compiler'),
            VariableSubstitution: require('edp-build/lib/processor/variable-substitution'),
            ManifestCompiler    : require('edp-build/lib/processor/manifest-compiler'),
            AddCopyright        : require('edp-build/lib/processor/add-copyright'),
            ReplaceDebug        : require('edp-build/lib/processor/replace-debug'),
            TplMerge            : require('edp-build/lib/processor/tpl-merge'),
            StringReplace       : require('edp-build/lib/processor/string-replace'),
            BcsUploader         : require('edp-build/lib/processor/bcs-uploader'),
            OutputCleaner       : require('edp-build/lib/processor/output-cleaner'),
            CssSpriter          : require('edp-build/lib/processor/css-spriter'),
            BabelProcessor      : require('edp-build/lib/processor/babel-processor')
        });
    }
}


/**
 * 处理构建入口
 *
 * @param {Object} processContext 处理器上下文
 * @param {Object} conf 构建功能配置模块
 * @param {Function=} callback 构建完成的回调函数
 */
function main(processContext, conf, callback) {
    var done = callback || noop;

    // 构建过程：
    // 1. 输入：自动遍历读取所有构建目录下文件，区分（文本/二进制）
    // 2. 使用conf.getProcessors获取processors
    // 3. 处理：processors对每个已读取的文件进行处理
    // 4. 输出：统一对处理结果进行输出，区分（文本/二进制）
    // var exclude = conf.exclude || [];
    // var baseDir = conf.input;
    // var outputDir = conf.output;
    // var fileEncodings = conf.fileEncodings || {};

    injectProcessor(conf);

    var processors = conf.getProcessors();
    if (!Array.isArray(processors)) {
        if (conf.stage in processors) {
            // 返回的是对象，key应该是stage的值
            processors = processors[conf.stage];
        }
        else {
            edp.log.error('Invalid stage value, candidates are = %s',
                JSON.stringify(Object.keys(processors)));
            done();
            return;
        }
    }

    var start = Date.now();
    edp.log.info('Scan build root directory (%sms)', Date.now() - start);

    var processorIndex = 0;
    var processorCount = processors.length;

    function nextProcess() {
        if (processorIndex >= processorCount) {
            outputFiles();
            return;
        }

        var processor = processors[processorIndex++];
        if (!(processor instanceof ProcessorBase)) {
            processor = new ProcessorBase(processor);
        }

        edp.log.info('Running ' + processor.name);
        if (processor.start) {
            processor.start(processContext, nextProcess);
        }
        else {
            nextProcess();
        }
    }

    nextProcess();

    function outputFiles() {
        edp.log.info('All done (%sms)', Date.now() - start);
        done(processContext.getFiles());
    }
}

module.exports = exports = main;
