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

## Related

- [edp](https://github.com/ecomfe/edp)
