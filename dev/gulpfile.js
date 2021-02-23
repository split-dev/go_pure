'use strict';

const gulp = require('gulp'),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    scsslint = require('gulp-scss-lint');
    // importResolve = require('import-resolve');
/**
 * Asset paths.
 */
const scssSrc = 'scss/**/*.scss';
const jsSrc = 'js/*.js';
const assetsDir = '../assets/';

/**
 * Scss lint
 */
gulp.task('scss-lint', function() {
    return gulp.src(scssSrc)
        .pipe(scsslint());
});

/**
 * SCSS task
 */
gulp.task('css', function () {
    return gulp.src('scss/**/*.scss.liquid')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({ cascade : false }))
        .pipe(rename(function (path) {
            path.basename = path.basename.replace('.scss', '.min');
        }))
        .pipe(gulp.dest(assetsDir));
});

/**
 * JS task
 *
 * Note: you may or may not want to include the 2 below:
 * babel polyfill and jquery
 */
const jsFiles = [
    // './node_modules/babel-polyfill/dist/polyfill.js',
    // './node_modules/jquery/dist/jquery.slim.js',
    jsSrc,
];
const jsDest = assetsDir;

gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(jsDest))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(gulp.dest(jsDest));
});

/**
 * Images task
 */
gulp.task('images', function () {
    return gulp.src('image/**')
        .pipe(changed(assetsDir)) // ignore unchanged files
        .pipe(gulp.dest(assetsDir))
});

/**
 * Fonts task
 */
gulp.task('fonts', function () {
    return gulp.src('font/**')
        .pipe(changed(assetsDir)) // ignore unchanged files
        .pipe(gulp.dest(assetsDir))
});

/**
 * Watch task
 */
gulp.task('watch', function () {
    gulp.watch(scssSrc, ['css']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch('image/*.{jpg,jpeg,png,gif,svg}', ['images']);
    gulp.watch('font/*.{eot,svg,ttf,woff,woff2}', ['fonts']);
});

/**
 * Default task
 */
gulp.task('default', ['css', 'js', 'images', 'fonts', 'watch'] );
