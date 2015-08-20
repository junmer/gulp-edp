# gulp-edp

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies][dep-image]][dep-url]

[downloads-image]: http://img.shields.io/npm/dm/gulp-edp.svg
[npm-url]: https://npmjs.org/package/gulp-edp
[npm-image]: http://img.shields.io/npm/v/gulp-edp.svg
[dep-url]: https://david-dm.org/junmer/gulp-edp
[dep-image]: http://img.shields.io/david/junmer/gulp-edp.svg

> gulp with edp

## Usage

```js
var gulp = require('gulp');
var edp = require('gulp-edp');

gulp.src(
    [
        'src/**/*.js'
        'dep/**/*.js',
        '!dep/**/{demo,demo/**}',
        '!dep/**/{test,test/**}'
    ]
)
.pipe(edp({
    getProcessors: function () {
        var moduleProcessor = new this.ModuleCompiler();
        return [moduleProcessor];
    }
}))
.pipe(gulp.dest('dist'));

```

## Config

### exclude 

Type: `Array`

Set the files to be exclude. match `minimatch` or `Regular Expression`.

### getProcessors

Type: `Function`
Return: `Array`

Create the edp processors, return processor list.

## Processors

The following processors are bundled with edp:

* [LessCompiler][lesscompiler-url] - Compile `*.less` to `*.css`
* [StylusCompiler][styluscompiler-url] - Compile `*.styl` to `*.css`
* [CssCompressor][csscompressor-url] - Compress css with clean-css
* [JsCompressor][jscompressor-url] - Compress js with uglifyjs2
* [ModuleCompiler][modulecompiler-url] - An AMD optimizer supports rich APIs  
* [PathMapper][pathmapper-url] - Repalce development path to production 
* [MD5Renamer][md5renamer-url] - Rename filename with md5 and replace the links
* [OutputCleaner][outputcleaner-url] - Ignore unuseful files

See [Edp Build WIKI][edp-wiki-buid-url] for more processors.

## AMD Optimize

|                   | edp              | requriejs\(r.js\) | amd-optimize     |
| ----------------- |:----------------:|:-----------------:|:----------------:|
| baseUrl           | :heart_eyes_cat: | :heart_eyes_cat:  | :heart_eyes_cat: |
| paths             | :heart_eyes_cat: | :heart_eyes_cat:  | :heart_eyes_cat: |
| packages          | :heart_eyes_cat: | :heart_eyes_cat:  | :scream_cat:     |
| map               | :heart_eyes_cat: | :heart_eyes_cat:  | :heart_eyes_cat: |
| shim              | :scream_cat:     | :heart_eyes_cat:  | :heart_eyes_cat: |
| stream-friendly   | :heart_eyes_cat: | :scream_cat:      | :heart_eyes_cat: |
| custom combine    | :heart_eyes_cat: | :scream_cat:      | :scream_cat:     |


## Related

- [edp](https://github.com/ecomfe/edp)

[edp-wiki-buid-url]: https://github.com/ecomfe/edp/wiki/Build
[lesscompiler-url]: https://github.com/ecomfe/edp/wiki/build-processors#lesscompiler
[styluscompiler-url]: https://github.com/ecomfe/edp/wiki/build-processors#styluscompiler
[csscompressor-url]: https://github.com/ecomfe/edp/wiki/build-processors#csscompressor
[jscompressor-url]: https://github.com/ecomfe/edp/wiki/build-processors#jscompressor
[modulecompiler-url]: https://github.com/ecomfe/edp/wiki/build-processors#modulecompiler
[pathmapper-url]: https://github.com/ecomfe/edp/wiki/build-processors#pathmapper
[md5renamer-url]: https://github.com/ecomfe/edp/wiki/build-processors#md5renamer
[outputcleaner-url]: https://github.com/ecomfe/edp/wiki/build-processors#outputcleaner
