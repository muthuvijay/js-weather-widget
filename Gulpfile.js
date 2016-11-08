var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

var appPath = 'src/';	


gulp.task('start', ['AppJS','watch'],function() {
  //Configure your stock market backend via command line params and start your dev server
  plugins.connect.server({
      root:['src'],
      port:3005
    });
});

/*** BUILD APP JS ***/

var jsorder = [appPath+'widget.js'] 
gulp.task('AppJS', function() {
  return gulp.src(jsorder)
    .pipe(plugins.concat('widget.js'))
    .pipe(plugins.rename({suffix: '.min'}))
    // .pipe(plugins.uglify())
    .pipe(gulp.dest(appPath))
    .pipe(plugins.notify({ message: 'AppJS task complete' }));
});

//clean all dest folders before creating
gulp.task('clean', function() {
  return gulp.src([AppJS], {read: false})
    .pipe(plugins.clean());
});


gulp.task('watch', function() {
  // Watch .js files
  gulp.watch(appPath+'js/*.js', ['AppJS']);

});

gulp.task('test:e2e', function() {
  //Run end to end test suite
  
});

gulp.task('test:unit', function() {
  //Run unit test suite
  
});
