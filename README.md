# gulp-edp

> gulp with edp

# Usage

```
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

# Related

- [edp](https://github.com/ecomfe/edp)
