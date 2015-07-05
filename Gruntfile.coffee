'use strict'

module.exports = (grunt) ->

  PATTERN_LOAD_TASK =
    pattern: 'grunt-*'
    scope: 'devDependencies'
  (require 'load-grunt-tasks')(grunt, PATTERN_LOAD_TASK)

  grunt.loadNpmTasks('grunt-contrib-watch')
  # configure the tasks
  grunt.initConfig

    nodemon:
      server:
        script: 'server/app.js'
        options:
          ignore: ['public/**', 'node_modules/**']
          watch: ['server']
          ext: 'js,html'
          delayTime: 1
          cwd: __dirname
    watch:
      scripts:
        files: ['public/**/*', 'server/index.html']
        tasks: []
        options:
          livereload: 35729,
        # options:
        #   spawn: false

    # Concurrent tasks
    concurrent:
      server:
        tasks: ['nodemon:server', 'watch']
        options:
          logConcurrentOutput: true

  #Create task to server Up.
  grunt.registerTask 'dev', 'Compile then start a connect web server',
    (target) ->
      grunt.task.run [
        'concurrent:server'
      ]
