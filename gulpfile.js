const gulp = require('gulp');
const sass = require('gulp-sass');
const minCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');
const { readFileSync } = require('fs');
const url = require('url');
const path = require('path');
const listData = require('./src/data/data.json');
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
});
// 压缩JS
gulp.task('uglifyJS', () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

// 启服务
gulp.task('server', () => {
    return gulp.src('./src')
        .pipe(webserver({
            port: 9999,
            middleware: (req, res, next) => {
                // 获取路径 
                let { pathname, query } = url.parse(req.url, true);
                if (pathname === '/favicon.ico') {
                    return res.end('');
                }
                if (pathname === '/api/getList') {
                    res.end(JSON.stringify({ code: 1, data: listData }));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
});