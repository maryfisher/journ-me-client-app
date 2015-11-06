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
            app: 'app',
            lib: 'lib',
            test: 'test',
            temp: '.temp',
            dist: 'dist/journ-me-client-dist',
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
            dev: [
                '<%= app.temp %>'
                //'<%= app.dist %>' dist folder is a git submodule, meant to be used by Shippable only
            ],
            bower: [
                '<%= app.lib %>/bower_components'
            ]
        },
        ngtemplates: {
            all: {
                cwd: '<%= app.app %>',
                src: '**/*.tpl.html',
                dest: '<%= app.temp %>/scripts/templates.js',
                options: {
                    module: 'jm',
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
        tsd: {
            refresh: {
                options: {
                    command: 'reinstall',
                    latest: true,
                    config: 'tsd.json',
                    // experimental: options to pass to tsd.API 
                    opts: {
                        // props from tsd.Options 
                    }
                }
            }
        },
        ts: {
            dev: {
                src: [
                    '<%= app.temp %>/ts/common/**/*.ts',
                    '<%= app.temp %>/ts/user/**/*.ts',
                    '<%= app.temp %>/ts/journey/**/*.ts',
                    '<%= app.temp %>/ts/moment/**/*.ts',
                    '<%= app.temp %>/ts/auth/**/*.ts',
                    '<%= app.temp %>/ts/config/**/*.ts',
                    '<%= app.temp %>/ts/Main.ts',
                    '<%= app.temp %>/ts/app.ts',
                    '<%= app.lib %>/typings/**/*.ts'],
                reference: '<%= app.temp %>/ts/reference.ts',
                out: '<%= app.temp %>/scripts/build.js',
                sourceMap: true
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            files: {
                src: ['<%= app.app %>/**/*.ts']
            }
        },
        less: {
            dev: {
                files: {
                    '<%= app.temp %>/style/main.css': '<%= app.app %>/compile.lesstpl'
                },
                options: {
                    plugins: [require('less-plugin-glob')]
                }
            }
        },
        copy: {
            indexDev: {
                expand: true,
                cwd: '<%= app.app %>/',
                src: ['indexDev.html'],
                dest: '<%= app.temp %>/',
                rename: function (dest, src) {
                    return dest + src.replace(/indexDev/, 'index');
                }
            },
            indexProd: {
                expand: true,
                cwd: '<%= app.app %>/',
                src: ['indexProd.html'],
                dest: '<%= app.dist %>/',
                rename: function (dest, src) {
                    return dest + src.replace(/indexProd/, 'index');
                }
            },
            ts: {
                expand: true,
                cwd: '<%= app.app %>/',
                src: ['**/*.ts'],
                dest: '<%= app.temp %>/ts'
            }
        },
        concat: {
            options: {
                separator: grunt.util.linefeed + grunt.util.linefeed
            },
            dist: {
                files: {
                    '<%= app.dist %>/style/app.min.css': [
                        '<%= app.lib %>/bower_components/bootstrap/dist/css/bootstrap.css',
                        '<%= app.lib %>/bower_components/fontawesome/css/font-awesome.css',
                        '<%= app.temp %>/style/main.css'
                    ],
                    '<%= app.dist %>/scripts/app.min.js': [
                        '<%= app.lib %>/bower_components/angular/angular.js',
                        '<%= app.lib %>/bower_components/angular-animate/angular-animate.js',
                        '<%= app.lib %>/bower_components/angular-ui-router/release/angular-ui-router.js',
                        '<%= app.lib %>/bower_components/angular-cookies/angular-cookies.js',
                        '<%= app.lib %>/bower_components/angular-resource/angular-resource.js',
                        '<%= app.lib %>/bower_components/angular-bootstrap/ui-bootstrap.js',
                        '<%= app.lib %>/bower_components/angular-messages/angular-messages.js',
                        '<%= app.lib %>/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                        '<%= app.lib %>/bower_components/ng-file-upload/ng-file-upload.js',
                        '<%= app.temp %>/scripts/build.js',
                        '<%= app.temp %>/scripts/templates.js'
                    ]
                }
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
                files: ['<%= app.app %>/**/*.html'],
                tasks: ['ngtemplates', 'copy:indexDev']
            },
            devSource: {
                files: ['<%= app.app %>/**/*.ts', '<%= app.lib %>/typings/**/*.ts'],
                tasks: ['tslint', 'copy:ts', 'ts']
            },
            devStyle: {
                files: ['<%= app.app %>/**/*.less'],
                tasks: ['less']
            }
        }
    });

    // GruntJS task registration

    grunt.registerTask('bowerInstall', [
        'clean:bower',
        'bower'
    ]);

    grunt.registerTask('build', [
        'clean:dev',
        'tslint',
        'ngtemplates',
        'copy:ts',
        'ts',
        'less',
        'copy:indexDev'
    ]);

    grunt.registerTask('run', [
        'build',
        'express',
        // Express usually stops after Grunt task execution completes. Keep execution alive via subsequent task 'express-keepalive' or another alive task such as 'watch'
        'watch'
    ]);

    grunt.registerTask('package', [
        'concat:dist',
        'copy:indexProd'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};