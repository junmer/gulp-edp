# gulp-edp

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Dependencies][dep-image]][dep-url]

> gulp with edp

## Usage

```js
var gulp = require('gulp');
var edp = require('gulp-edp');

var edpConfig = require('./edp-build-config');

gulp.task('edp', function () {
    return gulp.src(
        [
            'src/**/*.js',
            'dep/**/*.js',
            '!dep/**/{demo,demo/**}',
            '!dep/**/{test,test/**}',
            '*.html'
        ]
    )
    .pipe(edp(edpConfig))
    .pipe(gulp.dest('dist'));
})


gulp.task('default', ['edp']);


```

## Config

### exclude 

Type: `Array`

Set the files to be excluded. match [`minimatch`][minimatch-url] or `Regular Expression`.

### getProcessors

Type: `Function`

Return: `Array`

Create the edp processors, return processor list.

## Processors

The following processors are bundled with edp:

* [LessCompiler][lesscompiler-url] - Compile `*.less` to `*.css`
* [StylusCompiler][styluscompiler-url] - Compile `*.styl` to `*.css`
* [CssCompressor][csscompressor-url] - Compress css with [`clean-css`][clean-css-url]
* [JsCompressor][jscompressor-url] - Compress js with [`uglifyjs2`][uglifyjs2-url]
* [ModuleCompiler][modulecompiler-url] - An [`AMD`][amd-url] optimizer supports rich APIs  
* [PathMapper][pathmapper-url] - Repalce development path to production 
* [MD5Renamer][md5renamer-url] - Rename filename with md5 and replace the links
* [OutputCleaner][outputcleaner-url] - Ignore unuseful files

See [Edp Build WIKI][edp-wiki-build-url] for more processors.

## AMD Optimize

|                   | edp | requriejs\(r.js\) | amd-optimize |
| ----------------- |:---:|:-----------------:|:------------:|
| baseUrl           | √   | √                 | √            |
| paths             | √   | √                 | √            |
| packages          | √   | √                 | X            |
| map               | √   | √                 | √            |
| shim              | X   | √                 | √            |
| stream friendly   | √   | X                 | √            |
| custom combine    | √   | X                 | X            |


## Related

- [edp][edp-url]

[downloads-image]: http://img.shields.io/npm/dm/gulp-edp.svg
[npm-url]: https://npmjs.org/package/gulp-edp
[npm-image]: http://img.shields.io/npm/v/gulp-edp.svg
[dep-url]: https://david-dm.org/junmer/gulp-edp
[dep-image]: http://img.shields.io/david/junmer/gulp-edp.svg

[minimatch-url]: https://github.com/isaacs/minimatch
[clean-css-url]: https://github.com/jakubpawlowicz/clean-css
[uglifyjs2-url]: https://github.com/mishoo/UglifyJS2
[amd-url]: https://github.com/amdjs/amdjs-api
[edp-url]: https://github.com/ecomfe/edp

[edp-wiki-build-url]: https://github.com/ecomfe/edp/wiki/Build
[lesscompiler-url]: https://github.com/ecomfe/edp/wiki/build-processors#lesscompiler
[styluscompiler-url]: https://github.com/ecomfe/edp/wiki/build-processors#styluscompiler
[csscompressor-url]: https://github.com/ecomfe/edp/wiki/build-processors#csscompressor
[jscompressor-url]: https://github.com/ecomfe/edp/wiki/build-processors#jscompressor
[modulecompiler-url]: https://github.com/ecomfe/edp/wiki/build-processors#modulecompiler
[pathmapper-url]: https://github.com/ecomfe/edp/wiki/build-processors#pathmapper
[md5renamer-url]: https://github.com/ecomfe/edp/wiki/build-processors#md5renamer
[outputcleaner-url]: https://github.com/ecomfe/edp/wiki/build-processors#outputcleaner
