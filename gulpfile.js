const gulp = require('gulp');
const sass = require('gulp-sass');
const minCss = require('gulp-clean-css');

// 编译Sass
gulp.task('mySass', () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'));
});
// 监听sass
gulp.task('watching', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('mySass'));
})