"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coveralls = require('gulp-coveralls');
var rename = require('gulp-rename');
var karma = require('karma').server;

var _coverage = 'coverage/**/lcov.info';
var _appSrc = 'src/ng-redirect-to.js';
var _appMin = 'ng-redirect-to.min.js';
var _appDist = 'dist';

gulp.task('build', ['unit_test'], function()
{
    gulp
        .src(_appSrc)
        .pipe(uglify())
        .pipe(rename(_appMin))
        .pipe(gulp.dest(_appDist));
})

gulp.task('unit_test', function(done)
{
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
    }, done);
})

gulp.task('coverage', ['unit_test'], function()
{
    gulp
        .src(_coverage)
        .pipe(coveralls());
})
