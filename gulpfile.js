var gulp = require('gulp');
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

var cache = require('gulp-cache');

var del = require('del');

// create scss compile
gulp.task('sass', function() {
  return gulp.src('dev/scss/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('dev/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

// watch files and browserSync
gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('dev/scss/**/*.scss', ['sass']);
    gulp.watch('dev/*.html', browserSync.reload); 
    gulp.watch('dev/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dev'
    },
  })
});

// compile/minify js and css
gulp.task('useref', function() {
    return gulp.src('dev/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// optimize images
gulp.task('images', function(){
  return gulp.src('dev/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
  })))
  .pipe(gulp.dest('dist/images'))
});

// compile fonts from dev(app in this case) to dist folder
gulp.task('fonts', function() {
    return gulp.src('dev/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

// clean up folders
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// task to combine a sequence of tasks together
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
});

// default task allows use of 'gulp' instead of 'gulp watch'
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});