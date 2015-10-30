module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            public: {
                src: [
                    'compiled/**/*',
                    'public/**/*',
                ]
            },
            server: {
                src: [
                    'app/**/*'
                ]
            }
        },
        //eslint: {
        //    all: ['src/js/**/*.js']
        //},
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
        browserify: {
            options: {
                debug: true,
                sourceMap: true,
                transform: [
                    [
                        'babelify',
                        {
                            stage: 0
                        }
                    ]
                ]
            },
            app: {
                files: {
                    'compiled/index.js': 'src/public/js/index.js'
                }
            }
        },
        uglify: {
            app: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/js/index.js': [
                        'compiled/index.js'
                    ]
                }
            },
            external: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/js/external.js': [
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular-route/angular-route.min.js',
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/bootstrap/dist/js/bootstrap.js'                        
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
                    'public/css/index.css': ['src/public/css/**/*.scss']
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
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
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
                        'public/views/**/*.html',
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
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
                    'browserify',
                    'babel',
                    'uglify',
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
                    /*'eslint',*/
                    'browserify:app',
                    'uglify:app',
                    'appcache'
                ],
            },
            jsexternal: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: ['bower_components/**/*.js'],
                tasks: ['uglify:external','appcache']
            },
            css: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: 'src/public/css/**',
                tasks: ['sass', 'cssmin:app', 'appcache']
            },
            cssexternal: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: 'bower_components/**/*.css',
                tasks: ['cssmin:external', 'appcache']
            },
            views: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: ['config/locals.json', 'src/public/index.jade', 'src/public/views/**'],
                tasks: ['jade', 'appcache']
            },
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask(
        'default', [
            'clean',
            'babel',
            /*'eslint',*/
            'browserify',
            'uglify',
            'sass',
            'cssmin',
            'jade',
            'appcache'
        ]
    );

    grunt.registerTask(
        'app', [
            'clean',
            'babel',
            /*'eslint',*/
            'browserify:app',
            'uglify:app',
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