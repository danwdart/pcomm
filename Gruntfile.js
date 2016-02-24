module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            public: {
                src: [
                    './compiled/**/*',
                    './public/**/*',
                ]
            },
            server: {
                src: [
                    './app/**/*'
                ]
            }
        },
        eslint: {
            app: ['src/app/**/*.js'],
            public: ['src/public/js/**/*.js']
        },
        //mocha: {
        //
        //}
        babel: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/app',
                        src: ['**/*.js'],
                        dest: 'app'
                    }
                ]
            }
        },
        copy: {
            external: {
                files: [
                    {
                        cwd: '',
                        flatten: true,
                        expand: true,
                        src: [
                            // we got to use these properly later
                            'bower_components/angular/angular.js',
                            'bower_components/angular-route/angular-route.js',
                            'bower_components/jquery/dist/jquery.js',
                            'bower_components/bootstrap/dist/js/bootstrap.js',
                            'bower_components/sweetalert/dist/sweetalert-dev.js',
                            'bower_components/swal-forms/swal-forms.js',
                            'bower_components/bootstrap/dist/js/bootstrap.js'
                        ],
                        dest: 'public/src/external/'
                    },
                    {
                        cwd: '',
                        flatten: true,
                        expand: true,
                        src: [
                            'bower_components/font-awesome/fonts/*'
                        ],
                        dest: 'public/fonts/'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/public/js',
                        src: ['**/*.js'],
                        dest: 'public/src/js'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/public/css',
                        src: ['**/*.scss'],
                        dest: 'public/src/css'
                    }
                ]
            }
        },
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true,
                    sourceMaps: true
                },
                transform: [
                    [
                        'babelify'
                    ]
                ]/*
                plugin: [
                    [
                        'minifyify'
                    ]
                ]*/
            },
            app: {
                files: {
                    'public/js/index.js': 'public/src/js/index.js'
                    //'compiled/index.js': 'src/public/js/index.js'
                }
            }
        },
        exorcise: {
            app: {
                options: {
                    root: 'public',
                    base: 'public'
                },
                files: {
                    'public/js/index.js.map': ['public/js/index.js']
                }
            }
        },
        /* Until I find a way to persist sourcemaps we're not compressing the client JS */
        /* Source map root does not work with uglify yet */
        /*
        uglify: {
            external: {
            }
        },
        */
        concat: {
            external: {
                files: {
                    'public/js/external.js': [
                        /* These must be in the right order of deps for now */
                        'public/src/external/jquery.js',
                        'public/src/external/bootstrap.js',
                        'public/src/external/angular.js',
                        'public/src/external/angular-route.js',
                        'public/src/external/sweetalert-dev.js',
                        'public/src/external/swal-forms.js'
                    ]
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            all: {
                files: {
                    'public/css/index.css': ['public/src/css/**/*.scss']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: true,
                roundingPrecision: -1
            },
            app: {
                files: {
                    'public/css/index.min.css': [
                        'public/css/index.css'
                    ]
                }
            },
            external: {
                files: {
                    'public/css/external.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                        'bower_components/font-awesome/css/font-awesome.min.css',
                        'bower_components/sweetalert/dist/sweetalert.css',
                        'bower_components/sweetalert/themes/twitter/twitter.css',
                        'bower_components/swal-forms/swal-forms.css'
                    ]
                }
            }
        },
        jade: {
            all: {
                options: {
                    data: function(dest, src) {
                        return require('./config/locals.json')
                    }
                },
                files: [
                    {
                        cwd: 'src/public/views',
                        src: '**/*.jade',
                        dest: 'public/views',
                        expand: true,
                        ext: '.html'
                    },
                    {
                        src: 'src/public/index.jade',
                        dest: 'public/index.html'
                    }
                ]
            }
        },
        appcache: {
            options: {

            },
            all: {
                dest: 'public/appcache.manifest',
                cache: {
                    patterns: [
                        'public/index.html',
                        'public/css/index.css',
                        'public/js/**/*.js',
                        'public/img/**/*',
                        'public/views/**/*.html'
                    ]
                },
                network: ['*']
            }
        },
        forever: {
            server: {
                options: {
                    index: 'app/server.js',
                    logDir: 'logs',
                    errFile: 'pcomm.err',
                    outFile: 'pcomm.out',
                    logFile: 'forever.out',

                }
            }
        },
        watch: {
            config: {
                options: {
                    reload: true
                },
                files: ['*.js', '*.json'],
                tasks: [
                    'clean',
                    'copy',
                    'browserify',
                    'babel',
                    'exorcise',
                    'concat',
                    'sass',
                    'jade',
                    'appcache',
                    'forever:server:stop',
                    'forever:server:start'
                ]
            },
            app: {
                options: {
                    spawn: true
                },
                files: ['src/app/**/*.js'],
                tasks: [
                    'eslint:app',
                    'clean:server',
                    'babel',
                    'forever:server:stop',
                    'forever:server:start'
                ]
            },
            jspublic: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: ['src/public/js/**/*.js'],
                tasks: [
                    'eslint:public',
                    'copy:js',
                    'browserify:app',
                    'exorcise:app',
                    'appcache'
                ],
            },
            jsexternal: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: ['bower_components/**/*.js'],
                tasks: ['concat','appcache']
            },
            css: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: 'src/public/css/**',
                tasks: [
                    'copy:css',
                    'sass',
                    'cssmin:app',
                    'appcache'
                ]
            },
            cssexternal: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: 'bower_components/**/*.css',
                tasks: [
                    'cssmin:external',
                    'appcache'
                ]
            },
            views: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: [
                    'config/locals.json',
                    'src/public/index.jade',
                    'src/public/views/**'
                ],
                tasks: [
                    'jade',
                    'appcache'
                ]
            },
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask(
        'default', [
            'clean',
            'copy',
            'eslint',
            'babel',
            'browserify',
            'exorcise',
            'concat',
            'sass',
            'cssmin',
            'jade',
            'appcache'
        ]
    );

    grunt.registerTask(
        'app', [
            'clean',
            'copy',
            'eslint',
            'babel',
            'browserify:app',
            'exorcise:app',
            'sass',
            'cssmin:app',
            'jade',
            'appcache'
        ]
    );

    grunt.registerTask('start', ['forever:server:start']);
    grunt.registerTask('stop', ['forever:server:stop']);
    grunt.registerTask(
        'restart',
        [
            'forever:server:stop',
            'forever:server:start'
        ]
    );
}
