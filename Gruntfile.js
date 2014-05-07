/*global module:true */
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      all: ['main.js', 'lib/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
      },
      all: ['spec/']
    }


  });


  /* LOAD PLUGINS */
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  /* TARGETS */
  grunt.registerTask('default', ['jshint', 'jasmine_node']);
};
