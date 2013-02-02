
module.exports = function(grunt) {
  "use strict";

  var spawn = require('child_process').spawn;
  var log = grunt.log;

  var puts = function(data) {
    log.write(String(data));
  };

  grunt.registerMultiTask("forge", "Compile and run the app using forge.", function() {

    var options = this.options({
      command: "forge",
    });

    var  params = this.data.params;
    var done = this.async();
    var cmd = spawn(options.command, params);
    cmd.stdout.on('data', puts);
    cmd.stderr.on('data', puts);
    cmd.on('exit', function(data){ done(); });

  });

};
