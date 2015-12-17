var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulpUtil = require('gulp-util');

gulp.task('lint', function () {
    return gulp.src('./browser/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
    return gulp.src('./browser/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('browser/js/dist'))
        .pipe(rename('script.min.js'))
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(gulp.dest('browser/js/dist'));
});

gulp.task('scss', function () {
    return gulp.src('./assets/stylesheets/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function () {
    gulp.watch('browser/**/*.js', ['lint, scripts']);
    gulp.watch('assets/stylesheets/*.scss', ['scss']);
})

gulp.task('default', ['lint', 'scipts', 'scss', 'watch']);
