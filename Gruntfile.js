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
      lib: 'lib',
      test: 'test',
      temp: '.temp',
      dist: 'dist'
    },
    bower: {
      install: {
        options: {
          install: true,
          //targetDir: '<%= app.lib %>/bower_components', -- not necessary, since 'bower install' is executed and will read from .bowerrc config file
          verbose: true,
          copy: false
        }
      }
    },
    clean: {
      all: {
        files: [{
          dot: true,
          src: [
            '<%= app.temp %>',
            '<%= app.dist %>'
          ]
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= app.src %>/**/*.js',
        '<%= app.test %>/**/*.js'
      ]
    },
    ngtemplates: {
      templates1: {
        src: '<%= app.src %>/ui/**/*.tpl.html',
        dest: '<%= app.temp %>/scripts/templates.js',
        options: {
          module: 'JournMeClient',
          url: function(url) {
            return url.replace(/(src\/)/, '');
          }
        }
      }
    },
    express: {
      dev: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: [
            '<%= app.src %>',
            '<%= app.lib %>'
          ],
          //server: '<%= app.test %>/server/serverMock.js', -- setting up server mock responses later
          livereload: true
        }
      }
    },
    watch: {
      ngTemplates: {
        files: ['<%= app.src %>/ui/**/*.html'],
        tasks: ['ngtemplates']
      }
    }
  });

  // GruntJS task registration
  grunt.registerTask('build', [
    'clean',
    'jshint',
    'ngtemplates'
  ]);

  grunt.registerTask('run', [
    'build',
    'express',
    'watch'
  ]);

  grunt.registerTask('default', [
    'bower',
    'run'
  ]);
};