module.exports = function(grunt) {
    grunt.initConfig({
        clean: {
            all: {
                src: [
                    'js/**/*.js',
                    'compiled/**/*',
                    'css/**/*.css',
                    'views/**/*.jade',
                    'index.html'
                ]
            }
        },
        //eslint: {
        //    all: ['src/js/**/*.js']
        //},
        //mocha: {
        //    
        //}
        browserify: {
            all: {
                options: {
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
                files: {
                    'compiled/index.js': 'src/js/index.js'
                }
            }
        },
        uglify: {
            all: {
                options: {
                    sourceMap: true
                },
                files: {
                    'js/index.js': [
                        'compiled/index.js'
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
                    'css/index.css': ['src/css/**/*.scss']
                }
            }
        },
        /** TODO css min with deps **/
        jade: {
            all: {
                options: {
                    data: function(dest, src) {
                        return require('./locals.json')
                    }
                },
                files: [
                    {
                        cwd: 'src/views',
                        src: '**/*.jade',
                        dest: 'views',
                        expand: true,
                        ext: '.html'
                    },
                    {
                        src: 'index.jade',
                        dest: 'index.html'
                    }
                ]
            }
        },
        appcache: {
            options: {

            },
            all: {
                dest: 'appcache.manifest',
                cache: {
                    patterns: [
                        'index.html',
                        'css/index.css',
                        'js/index.js',
                        'img/**/*',
                        'views/**/*.html'
                    ]
                }
            }
        },
        watch: {
            config: {
                options: {
                    reload: true
                },
                files: ['*.js', '*.json']
            },
            js: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: ['bower_components/**/*.js', 'src/js/**/*.js', 'ext/**/*.js'],
                tasks: [/*'eslint',*/ 'browserify', 'uglify', 'appcache'],
            },
            css: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: 'src/css/**',
                tasks: ['sass', 'appcache']
            },
            views: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: ['index.jade', 'src/views/**'],
                tasks: ['jade', 'appcache']
            },
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['clean', /*'eslint',*/ 'browserify', 'uglify', 'sass', 'jade', 'appcache']);
}