const { series, src, dest } = require('gulp');
const removeCode = require('gulp-remove-code');
const minify = require('gulp-minify-css');
const concat = require('gulp-concat');
function concatCss() {
  return src('./es/**/*.css')
    .pipe(minify())
    .pipe(concat('index-all.min.css'))
    .pipe(dest('./es/'));
}

function removeCodeFn() {
  return src('./es/**/*.js')
    .pipe(removeCode({ production: false }))
    .pipe(dest('./es/'));
}

function copyDts() {
  return src('./elelive-ui.d.ts')
    .pipe(removeCode({ production: false }))
    .pipe(dest('./es/'));
}

exports.default = series(removeCodeFn, copyDts, concatCss);
