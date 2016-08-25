var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var jade = require('gulp-jade');


gulp.task('sass', function() {
  return gulp.src('src/assets/css/main.scss')
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer())
    .pipe(sourcemaps.write('../sourcemaps'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream())

    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('jade', function() {
  return gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./'));
});

gulp.task('js', function() {
  return gulp.src(['src/assets/js/chance.min.js', 'src/assets/js/holder-ipsum.min.js', 'src/assets/js/dummi.js'])
    .pipe(plumber({errorHandler: errorAlert}))
    .pipe(sourcemaps.init())
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('../sourcemaps'))
    .pipe(gulp.dest('assets/js'))
});


function reload() {
  return browserSync.reload();
}

gulp.task('jade-reload', ['jade'], reload);
gulp.task('js-reload', ['js'], reload);

gulp.task('serve', ['sass', 'js', 'jade'], function() {
  browserSync.init({
    server: {
       baseDir: './'
    }
  });

  gulp.watch(['src/assets/css/**/*.scss', 'src/assets/css/**/*.sass', 'src/assets/css/main.scss'], ['sass']);
  gulp.watch('src/assets/js/*.js', ['js-reload']);
  gulp.watch(['src/*.jade', 'src/includes/*.jade'], ['jade-reload']);
});

gulp.task('default', ['serve']);


function errorAlert(error) {
  notify.onError({title: 'Gulp Error', message: 'Beep beep beep, stuffs going down. Check the console.', sound: true})(error);
  console.log(error.toString());
  this.emit('end');
}
