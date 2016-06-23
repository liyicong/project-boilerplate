var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var reload = browserSync.reload;

gulp.task('sass',function () {
  return sass('app/scss/**/*.scss',{sourcemap: true})

    .on('error', sass.logError)

    .pipe(sourcemaps.write('./',{
      includeContent: false,
      sourceRoot: '../scss/'
    }))

    .pipe(gulp.dest('app/styles'))
    .pipe(filter('**/*.css'))
    .pipe(reload({ stream:true }));
});

gulp.task('serve',['sass'],function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch(['*.html','styles/**/*.css','scripts/**/*.js'], {cwd: 'app'}, reload);
  gulp.watch('app/**/*.scss',['sass']);
});


