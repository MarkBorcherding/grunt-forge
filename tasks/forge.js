
module.exports = function(grunt) {
  "use strict";

  var log = grunt.log;
  var verbose = grunt.verbose;
  var spawn = require('child_process').spawn;

  var puts = function(data) {
    log.write(String(data));
  };

  var forge = function(options, done){
    var cmd = spawn("forge", options);
    cmd.stdout.on('data', puts);
    cmd.stderr.on('data', puts);
    cmd.on('exit', function(data){ done(); });
  };

  grunt.registerTask('forge:build', function(){
    forge(['build','ios'], this.async());
  });

  grunt.registerTask('forge:sim', function(){
    forge(['run','ios'], this.async());
  });

  grunt.registerTask('forge:device', function(){
    forge(['run', 'ios', '--io.device', 'device'], this.async());
  });

};
