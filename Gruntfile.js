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
                    'compiled/index.js': 'src/js/index.js'
                }
            }
        },
        uglify: {
            app: {
                options: {
                    sourceMap: true
                },
                files: {
                    'js/index.js': [
                        'compiled/index.js'
                    ]
                }
            },
            external: {
                options: {
                    sourceMap: true
                },
                files: {
                    'js/external.js': [
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular-route/angular-route.min.js',
                        'bower_components/angular-facebook/lib/angular-facebook.js',
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
                        'js/**/*.js',
                        'img/**/*',
                        'views/**/*.html',
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
                    ]
                },
                network: ['*']
            }
        },
        watch: {
            config: {
                options: {
                    reload: true
                },
                files: ['*.js', '*.json'],
                tasks: ['clean', 'browserify', 'uglify', 'sass', 'jade', 'appcache']
            },
            js: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: ['src/js/**/*.js'],
                tasks: [/*'eslint',*/ 'browserify:app', 'uglify:app', 'appcache'],
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
                files: 'src/css/**',
                tasks: ['sass', 'appcache']
            },
            views: {
                options: {
                    spawn: true,
                    livereload: true
                },
                files: ['locals.json', 'index.jade', 'src/views/**'],
                tasks: ['jade', 'appcache']
            },
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['clean', /*'eslint',*/ 'browserify', 'uglify', 'sass', 'jade', 'appcache']);
}