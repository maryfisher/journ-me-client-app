'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Load node module plugins one by one not necessary if using load-grunt-tasks
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  var pkg = grunt.file.readJSON('package.json');

  // Project configuration
  grunt.initConfig({
    pkg: pkg,
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
    'uglify'
  ]);
};