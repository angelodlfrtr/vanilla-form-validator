var gulp   = require('gulp');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var karma  = require('karma').server;

gulp.task('default', ['coffee', 'minify']);

gulp.task('test', function(){

  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  });

});

gulp.task('watch', function() {

  gulp.watch('./src/**/*.coffee', ['coffee']);

  gulp.watch('./dist/vanilla-form-validator-with-rules.js', ['minify']);

});

gulp.task('coffee', function(){

  // Compile all
  gulp.src('./src/**/*.coffee')
    .pipe(coffee().on('error', console.log))
    .pipe(gulp.dest('./dist'));

  // Create version with all validators
  gulp.src(['./src/vanilla-form-validator.coffee', './src/rules/*.coffee'])
    .pipe(coffee().on('error', console.log))
    .pipe(concat('vanilla-form-validator-with-rules.js'))
    .pipe(gulp.dest('./dist'));

});

gulp.task('minify', function(){

  gulp.src('./dist/vanilla-form-validator-with-rules.js')
    .pipe(uglify())
    .pipe(rename('vanilla-form-validator-with-rules.min.js'))
    .pipe(gulp.dest('./dist'));

});
