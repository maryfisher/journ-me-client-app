'use strict';

module.exports = function (grunt) {
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
            dist: 'dist',
            server: 'server'
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
            all: [
                '<%= app.temp %>',
                '<%= app.dist %>'
            ]
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
            all: {
                cwd: '<%= app.src %>',
                src: '**/*.tpl.html',
                dest: '<%= app.temp %>/scripts/templates.js',
                options: {
                    module: 'jmApp',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        ngAnnotate: {
            all: {
                expand: true,
                cwd: '<%= app.src %>',
                src: ['**/*.js'],
                dest: '<%= app.temp %>/ngAnnotate'
            }
        },
        preConcat: {
            correct: {
                options: {
                    cwd: '<%= app.temp %>/ngAnnotate'
                },
                src: '<%= app.temp %>/ngAnnotate/**/*.js',
                dest: '<%= app.temp %>/scripts/build.js'
            }
        },
        concat: {
            options: {
                separator: ';' + grunt.util.linefeed,
                sourceMap: true
            }
        },
        copy: {
            dev: {
                expand: true,
                cwd: '<%= app.src %>/',
                src: ['index.html'],
                dest: '<%= app.temp %>/'
            }
        },
        express: {
            dev: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    bases: [
                        '<%= app.temp %>',
                        '<%= app.lib %>'
                    ],
                    server: '<%= app.server %>/server.js', // -- don't forget to restart Express via Grunt when changing this file
                    livereload: true //watches the bases folders for any changes
                }
            }
        },
        watch: {
            ngTemplates: {
                files: ['<%= app.src %>/**/*.html'],
                tasks: ['ngtemplates', 'copy:dev']
            },
            dev: {
                files: ['<%= app.src %>/**/*.js'],
                tasks: ['jshint', 'ngAnnotate', 'preConcat', 'concat']
            }
        }
    });

    // GruntJS task registration
    grunt.registerTask('build', [
        'clean',
        'jshint',
        'ngtemplates',
        'ngAnnotate',
        'preConcat',
        'concat',
        'copy:dev'
    ]);

    grunt.registerTask('run', [
        'build',
        'express',
        // Express usually stops after Grunt task execution completes. Keep execution alive via subsequent task 'express-keepalive' or another alive task such as 'watch'
        'watch'
    ]);

    grunt.registerTask('default', [
        //'bower',
        'run'
    ]);
};