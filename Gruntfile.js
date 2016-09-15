module.exports = function(grunt) {
    grunt.initConfig({
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


}
