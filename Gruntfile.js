/*global module:true */
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    /* JSHINT */
    /* See http://is.gd/jshintopts for more options */
    /* This follows the npm style guide at http://is.gd/npmstyle */
    jshint: {
      all: ['main.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: true
      }
    }
  });

  /* LOAD PLUGINS */
  grunt.loadNpmTasks('grunt-contrib-jshint');

  /* TARGETS */
  grunt.registerTask('default', ['jshint']);
};
