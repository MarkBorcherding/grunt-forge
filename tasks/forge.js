"use strict";

module.exports = function(grunt) {

  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.utils;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;

  // dependencies
  // ------------

  var spawn = require('child_process').spawn;

  var puts = function(data) {
    log.write(String(data));
  };


  grunt.registerTask('forge:build', function(){
    var done = this.async();
    var forge = spawn("forge", ['build', 'ios']);
    forge.stdout.on('data', puts);
    forge.stderr.on('data', puts);
    forge.on('exit', function(data){ done(); });
  });

  grunt.registerTask('forge:sim', function(){
    var done = this.async();
    var forge = spawn("forge", ['run', 'ios']);
    forge.stdout.on('data', puts);
    forge.stderr.on('data', puts);
    forge.on('exit', function(data){ done(); });
  });

  grunt.registerTask('forge:device', function(){
    var done = this.async();
    var forge = spawn("forge", ['run', 'ios', '--io.device', 'device']);
    forge.stdout.on('data', puts);
    forge.stderr.on('data', puts);
    forge.on('exit', function(data){ done(); });
  });

};
