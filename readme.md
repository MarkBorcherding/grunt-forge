# grunt-forge

Help run forge to compile and run Trigger.io apps.

## Installation

Add the following to your `package.json`.

```javascript
  "grunt-forge": "git://github.com/MarkBorcherding/grunt-forge.git",
```

Add the folloing to your `grunt.js`.

```javascript
grunt.loadNpmTasks('grunt-forge');

grunt.initConfig({

  //...

  forge: {
    ios_build: { params: ['build', 'ios'] },
    ios_sim: { params: ['run', 'ios'] },
    ios_device: { params: ['run', 'ios', '--ios.device', 'device'] }
    ios_package: { params: ['package', 'ios'] }
  }

  //...

});
```

You can add whatever tasks you want. It doesn't do anything special other than chain the arguments together
and run `forge`.


## Shortcuts

Create shortcut tasks by giving common tasks easy names.

```javascript
grunt.registerTask("build", 'coffee compass copy forge:ios_build');
grunt.registerTask("sim", 'build forge:ios_sim');
grunt.registerTask("device", 'build forge:ios_device');
grunt.registerTask("package", 'build forge:ios_package');
```

## Output

The tasks add a bit of color to the output.  It also eliminates some noise, and tries to reduce the amount of ouput
to a more mangeable amount. If you're not seeing some output, keep that in mind.

As an example, it strips out some device specific path infomation and leave the more important bits.

