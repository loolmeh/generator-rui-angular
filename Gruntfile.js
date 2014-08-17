/*
 * generator-rui-angular
 * n/a
 *
 * Copyright (c) 2014 loolmeh
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/fixtures/*']
    },

    // Configuration to be run (and then tested).
    rapydscript: {
        options: {
            prettify: true,
            stats: true,
            verbose: true
        },
        compile: {
            files: [
                {
                  expand: true,     
                  src: ['*/*.pyj', '*.pyj'],
                },
            ],
        }
   },
        // Unit tests.
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/**/*.js']
      }
    },
  
    watch: {
      rapydscript: {
        files: ['*.pyj', '*/*.pyj'],
        tasks: ['rapydscript'],
        options: {
          spawn: false,
        },
      },
    },

  });
  
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('rapydscript.compile.files', [{src: [filepath]}]);
  });

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'rapydscript', 'mochaTest']);
  grunt.registerTask('rapyd', ['rapydscript']);

};
