
module.exports = function(grunt) {
  "use strict";

  var spawn = require('child_process').spawn;
  var log = grunt.log;

  var puts = function(data) {
    var message = String(data);

    message = message.replace(/ERROR/g, "ERROR".red )
                     .replace(/WARNING/g, "WARNING".yellow)
                     .replace(/INFO/g, "INFO".cyan)
                     .replace(/DEBUG/g, "DEBUG".grey)
                     .replace(/CRITICAL/g, "CRITICAL".red.reverse)
                     .replace(/FORGE/g, "FORGE".blue)
                     .replace(/\d{4}-\d{2}-\d{2} [0-9:\.]+ Forge\[[0-9:a-f]+\] /g, "")
                     .replace(/file:\/\/\/.*\/Forge\/[^\/]+/g, "file:///....".grey)
                     ;

    log.write(message);
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
