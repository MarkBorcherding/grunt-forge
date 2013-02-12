
module.exports = function(grunt) {
  "use strict";

  var spawn = require('child_process').spawn;
  var log = grunt.log;

  var split = function(str) {
    return str.split("\n");
  };


  var LOGGING_MESSAGE_REGEX = /^\[\s*\w+] \[\w+\] \[FORGE\] '/;
  var loggingMessage = function(line) {
    var regex = LOGGING_MESSAGE_REGEX;
    if(regex.test(line)) {
      line = line.replace(regex, '');
      line = line.replace(/'$/,'');
      return '[   INFO] '+ line;
    }
  };


  var SYS_INFO_MESSAGE_REGEX = /^\[\s+\w+\] [A-Za-z]/;
  var SYS_ERROR_MESSAGE_REGEX = /^\[\s*(WARNING|ERROR|CRITICAL)\]/;
  var systemMessage = function(line){
    if(SYS_INFO_MESSAGE_REGEX.test(line)
       || SYS_ERROR_MESSAGE_REGEX.test(line)) {
      return  line;
    }
  };

  var filter = function(lines) {
    var remaining = [];
    for(var index in lines) {
      var line = lines[index].replace(/\d{4}-\d{2}-\d{2} [0-9:\.]+ Forge\[[0-9:a-f]+\] /g, "");
      var l = null;
      if( l = loggingMessage(line)
          || systemMessage(line)) {
            remaining.push(l);
          }
    }
    return remaining;
  };

  var colorize = function(messages) {
    for(var i=0; i<messages.length; i++) {
      messages[i] = messages[i]
        .replace(/▾/g, '▾'.grey )
        .replace(/\|/g, '|'.grey )
        .replace(/ERROR/g, "ERROR".red )
        .replace(/WARNING/g, "WARNING".yellow)
        .replace(/INFO/g, "INFO".cyan)
        .replace(/DEBUG/g, "DEBUG".grey)
        .replace(/CRITICAL/g, "CRITICAL".red.reverse)
        .replace(/FORGE/g, "FORGE".blue);
    }
    return messages;
  };

  var verbosePuts = function(data) {
    log.write(String(data));
  };

  var puts = function(data) {
    var chunk = String(data);
    var lines = split(chunk);
    lines = filter(lines);
    lines = colorize(lines);
    for(var index in lines) {
      log.writeln(lines[index]);
    }
  };


  grunt.registerMultiTask("forge", "Compile and run the app using forge.", function() {

    var options = this.options({
      command: "forge",
      verbose: false
    });

    var  params = this.data.params;
    var done = this.async();
    var cmd = spawn(options.command, params);

    var output = (options.verbose || params.verbose) ? verbosePuts : puts;

    cmd.stdout.on('data', output);
    cmd.stderr.on('data', output);
    cmd.on('exit', function(data){ done(); });

  });

};
