var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

var appPath = 'src/';	
var prodPath = 'dist/';
var prodJS = 'dist/js';


gulp.task('build', ['AppJS'], function() {
  /*return gulp.src([appPath + 'index.html'])
    .pipe(gulp.dest(prodPath))
    .pipe(plugins.notify({ message: 'View build complete' }));*/
});


gulp.task('start', ['build','watch'],function() {
  //Configure your stock market backend via command line params and start your dev server
  plugins.connect.server({
      root:['src'],
      port:3005
    });
});



/*** BUILD APP CSS ***/

gulp.task('AppCSS', function() {
  return gulp.src([appPath+'styles/*.css'])
    .pipe(plugins.rename({suffix: '.min'}))
    // .pipe(plugins.cleanCSS())
    .pipe(plugins.concat('app.min.css'))
    .pipe(gulp.dest(prodCSS))
    .pipe(plugins.notify({ message: 'AppCSS task complete' }));
});



/*** BUILD APP JS ***/

var jsorder = [appPath+'weather-widget.js'] 
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
  return gulp.src([prodCSS, prodJS], {read: false})
    .pipe(plugins.clean());
});


gulp.task('watch', function() {

  // Watch .css files

  // Watch .js files
  gulp.watch(appPath+'js/*.js', ['AppJS']);

});

gulp.task('test:e2e', function() {
  //Run end to end test suite
  
});

gulp.task('test:unit', function() {
  //Run unit test suite
  
});
