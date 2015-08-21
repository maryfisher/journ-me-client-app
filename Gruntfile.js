'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Load node module plugins one by one not necessary if using load-grunt-tasks
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  var pkg = grunt.file.readJSON('package.json');

  // Project configuration
  grunt.initConfig({
    pkg: pkg,
    app: {
      src: 'src',
      thirdparty: 'thirdparty',
      bower_components: 'thirdparty/bower_components',
      test: 'test',
      temp: '.temp',
      dist: 'dist'
    },
    bower: {
      install: {
        options: {
          install: true,
          //targetDir: '<%= app.bower_components %>', -- not necessary, since 'bower install' is executed and will read from .bowerrc config file
          verbose: true,
          copy: false
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  // GruntJS task registration
  grunt.registerTask('default', [
    'bower',
    'uglify'
  ]);
};