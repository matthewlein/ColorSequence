module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.initConfig({
        /*
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '/'
                }
            }
        },
        */

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

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};