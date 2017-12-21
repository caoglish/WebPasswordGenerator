config = {
  src: "./src/"
}
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     browserify: {
            app: {
                options: {
                    transform: [
                            ["babelify", {
                                "presets": ["es2015"]
                            }]
                        ]
                       
                },
                files: {
                    'dist/js/main.js': [config.src + "js/main.js"]
                }
            }
        },

    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: [config.src + "js/**/*.js"],
        tasks: ['browserify'],
      },
      html: {
        files: [config.src + "*.html"],
        tasks: ['copy:html']
      }
    },
    copy: {
      html: {
        expand: true,
        cwd: config.src,
        src: '*.html',
        dest: 'dist/'
      }
     
    },
    connect: {
      server: {
        options: {
          port: 8000,
          livereload: true,
          hostname: '127.0.0.1',
          open: true,
          base: './'
        }
      }
    },
    


  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-eslint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  //grunt.loadNpmTasks('grunt-babel');


  // Default task(s).
  grunt.registerTask('dev', ["connect", "watch"]);
  grunt.registerTask('default', ['copy:html','browserify']);
  //grunt.registerTask('watch', ['']);

};