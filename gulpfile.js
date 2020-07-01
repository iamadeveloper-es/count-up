var gulp = require('gulp');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
//var obfuscate = require('gulp-obfuscate');
var notify = require('gulp-notify');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
//var minify = require('gulp-minify');
//var cleanCSS = require('gulp-clean-css');
//var watch = require("gulp-watch-sass");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var build = require('gulp-build');
var runSequence = require('run-sequence');
var gulps = require("gulp-series");


gulp.task('process_dev', function () {
    return gulp.src(['./src/./js/*.js']) //Origen
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        //.pipe(obfuscate())     cd prod  pr
        .pipe(gulp.dest('./src/js/')) //Destino
        .pipe(notify("JS Compiled!")); //Mensaje
});


gulp.task('dev', function () {
    return gulp.watch('./src/js/*.js', gulp.series('process_dev'));
});

gulp.task('default', function () {
    gulp.watch('./src/js/*.js', gulp.series('process'));
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
});


gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write({ includeContent: true }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer('last 10 version'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(notify("Sass Compiled!")); //Mensaje

});



gulp.task('watchSass', function () {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    //gulp.watch('./src/scss/**/*.scss', ['styles']);
});

/***************/
//for production
/***************/

//Tarea para unir ó concatenar archivos
gulp.task('process', function () {
    return gulp.src(['./src/js/*.js']) //Origen
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        //.pipe(obfuscate())     
        .pipe(uglify())
        .pipe(gulp.dest('./js')) //Destino
        .pipe(notify("JS Compiled!")); //Mensaje

});

