
module.exports = function(grunt) {
  "use strict";

  var log = grunt.log;

  var split = function(str) {
    return str.split("\n");
  };

  var LOGGING_MESSAGE_REGEX = /^\[\s*\w+] \[\w+\] \[FORGE\] '/;
  var loggingMessage = function(line) {
    var regex = LOGGING_MESSAGE_REGEX;
    if (regex.test(line)) {
      line = line.replace(regex, '');
      line = line.replace(/'$/,'');
      return '[   INFO] '+ line;
    }
  };

  var SYS_INFO_MESSAGE_REGEX = /^\[\s+\w+\] [A-Za-z]/;
  var SYS_ERROR_MESSAGE_REGEX = /^\[\s*(WARNING|ERROR|CRITICAL)\]/;
  var systemMessage = function(line) {
    if (SYS_INFO_MESSAGE_REGEX.test(line) ||
        SYS_ERROR_MESSAGE_REGEX.test(line)) {
      return line;
    }
  };

  var ERROR_MESSAGE = /^\[\s+\w+\] (Error:|Stack trace:)/;
  var STACK_TRACE_LINE = /^\[\s*\w+\] .*@file:.*:\d+/;
  var stackTrace = function(line) {
    if (ERROR_MESSAGE.test(line) ||
        STACK_TRACE_LINE.test(line)) {
      return line
        .replace(/file:\/\/\/.*\/Forge\/[^\/]+/g, "file:///....")
        .replace('[   INFO]', '[  ERROR]');
    }
  };

  var filter = function(lines) {
    var remaining = [];
    for (var index in lines) {
      var line = lines[index].replace(/\d{4}-\d{2}-\d{2} [0-9:\.]+ Forge\[[0-9:a-f]+\] /g, "");
      var l = null;
      if (l = stackTrace(line) ||
          loggingMessage(line) ||
          systemMessage(line)) {
            remaining.push(l);
          }
    }
    return remaining;
  };

  var colorize = function(messages) {
    for (var i = 0; i < messages.length; i++) {
      messages[i] = messages[i]
        .replace(/▾/g, '▾'.grey )
        .replace(/\│/g, "│".grey )
        .replace(/\└/g, "└".grey )
        .replace(/\[  ERROR\]/g, "[  ".grey + "ERROR".red + "]".grey)
        .replace(/\[WARNING\]/g, "[".grey + "WARNING".yellow +"]".grey)
        .replace(/\[   INFO\]/g, "[   ".grey + "INFO".cyan + "]".grey)
        .replace(/\[  DEBUG\]/g, "[  ".grey + "DEBUG".grey + "]".grey)
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
    for (var index in lines) {
      log.writeln(lines[index]);
    }
  };


  grunt.registerMultiTask("forge", "Compile and run the app using forge.", function() {
    var options = this.options({
      command: "forge",
      verbose: false
    });
    var args = [
      "--username", options.username,
      "--password", options.password
    ].concat(this.data.args);

    var done = this.async();

    var child = grunt.util.spawn({
      cmd: options.command,
      args: args
    }, function (err, result, code) {
      var success = code === 0;
      
      if (code === 127) {
        return grunt.warn(
          'Please add the forge tool to your system PATH (not bash PATH).'
        );
      }

      done(success);
    });

    var output = options.verbose ? verbosePuts : puts;

    child.stdout.on('data', output);
    child.stderr.on('data', output);
  });

};
