module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        connect: {
            server: {
                options: {
                    port: 9001,
                    keepalive : false,
                    open : true,
                    livereload : true
                }
            }
        },
        watch : {
            options: {
                livereload: true,
                interrupt: true,
            },
            files: ['*'],
            // tasks: ['jshint'],
        },
        jshint : {
            all: ['js/**/*.js']
        },

    });

    // Default task(s).
    grunt.registerTask('default', [
        'connect',
        'watch'
    ]);

};