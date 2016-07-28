module.exports = function(grunt) {
    grunt.initConfig({
        
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
                        'public/src/external/bootstrap.js', // requires bootstrap
                        'public/src/external/angular.js',
                        'public/src/external/angular-route.js', // requires angular
                        'public/src/external/sweetalert-dev.js',
                        'public/src/external/swal-forms.js' // requires swal
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
        pug: {
            all: {
                options: {
                    data: (dest, src) => require('./config/locals.json')
                },
                files: [
                    {
                        cwd: 'src/public/views',
                        src: '**/*.pug',
                        dest: 'public/views',
                        expand: true,
                        ext: '.html'
                    },
                    {
                        src: 'src/public/index.pug',
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
                        'public/css/**/*.css',
                        'public/js/**/*.js',
                        'public/fonts/*',
                        'public/img/**/*'
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
                    'pug',
                    'ngtemplates',
                    'clean:views',
                    'browserify',
                    'babel',
                    'exorcise',
                    'concat',
                    'sass',
                    'cssmin',
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
                    'pug',
                    'ngtemplates',
                    'clean:views',
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
                    'clean:css',
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
                    'clean:cssexternal',
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
                    'src/public/*.pug',
                    'src/public/views/**'
                ],
                tasks: [
                    'pug',
                    'ngtemplates',
                    'clean:views',
                    'appcache'
                ]
            },
            assets: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: [
                    'src/public/static/**/*'
                ],
                tasks: [
                    /* having a clean would ruin everything */
                    'copy:static'
                ]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask(
        'default', [
            'clean',
            'copy',
            'eslint',
            'babel',
            'pug',
            'ngtemplates',
            'clean:views',
            'browserify',
            'exorcise',
            'concat',
            'sass',
            'cssmin',
            'appcache'
        ]
    );

    grunt.registerTask(
        'app', [
            'clean',
            'copy',
            'eslint',
            'babel',
            'pug',
            'ngtemplates',
            'clean:views',
            'browserify:app',
            'exorcise:app',
            'sass',
            'cssmin:app',
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
