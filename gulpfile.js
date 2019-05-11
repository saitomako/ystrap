// Defining requirements
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var postcss = require('gulp-postcss');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var gulpSequence = require('gulp-sequence');
var replace = require('gulp-replace');
var autoprefixer = require('autoprefixer');

// Configuration file to keep your code DRY
var cfg = require('./gulpconfig.json');
var paths = cfg.paths

// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task('sass', function() {
  var stream = gulp
    .src(paths.sass + '/*.scss')
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err);
          this.emit('end');
        }
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({ errLogToConsole: true }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
    .pipe(gulp.dest(paths.css));
  return stream;
});

// Run:
// gulp cssnano
// Minifies CSS files
gulp.task('minifycss', function() {
  return gulp
          .src(`${paths.css}/style.css`)
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(cleanCSS({ compatibility: '*' }))
          .pipe(
            plumber({
              errorHandler: function(err) {
                console.log(err);
                this.emit('end');
              }
            })
          )
          .pipe(rename({ suffix: '.min' }))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(paths.css));
});
