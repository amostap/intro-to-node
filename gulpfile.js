/* eslint-disable no-console */
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('serve', () => {
  const options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      PORT: 3000,
    },
    watch: jsFiles,
  };

  return nodemon(options)
    .on('restart', () => {
      console.log('Restarting');
    });
});
