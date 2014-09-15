module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n<%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n<%= pkg.description %>\nLovingly coded by <%= pkg.author.name %>  - <%= pkg.author.url %> \n*/\n',
        uglify: {
            options: {
                banner: '<%= banner %>',
                mangle: false,
                preserveComments: false
            },
            dist: {
                files: {
                    'public/js/main.min.js': ['public/js/accounting.js','public/js/main.js']
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            uglify: {
                files: ['public/js/main.js', 'public/js/lib/*.js'],
                tasks: ['uglify:dist']
            },
            php: {
                files: '**/*.html',
            }
        },
        modernizr: {
            dist: {
                "devFile": "remote",
                "outputFile": "public/js/lib/modernizr.js"
            }
        }
    });

    grunt.registerTask('build', [
        'uglify:dist'
    ]);

    grunt.registerTask('server', [
        'uglify:dist',
        'watch'
    ]);

    grunt.registerTask('default', 'build');
}
