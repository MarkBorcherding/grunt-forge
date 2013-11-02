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
    ios_build: {
      args: ['build', 'ios'],
      options: {
        username: 'your_trigger_email@example.com',
        password: 'your_trigger_password'
      }
    },
    ios_sim: { args: ['run', 'ios'] },
    ios_device: { args: ['run', 'ios', '--ios.device', 'device'] },
    ios_package: { args: ['package', 'ios'] }
  }

  //...

});
```

You can add whatever tasks you want. It doesn't do anything special other than chain the arguments together
and run `forge`.

You only need to add the `username` and `password` options if their prompts appear when you run `forge` manually. If the username and password prompts don't appear, it means your machine stored your login cookies at the TriggerToolkit directory (inside build-tools dir).


## Filtering

Many of the `forge` messages are filtered by default and you are left only with the logging messages. You can disable
this by setting `verbose:true` as an option.


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

