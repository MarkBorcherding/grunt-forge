# grunt-triggerio


# example

```javascript
forge: {
  build: {
    params: ['build', 'ios']
  },
  ios_sim: {
    params: ['run', 'ios']
  },
  ios_device: {
    params: ['run', 'ios', '--ios.device', 'device']
  }
}
```

Create shortcuts

```javascript
grunt.registerTask("sim", 'copy forge:build forge:ios_sim');
grunt.registerTask("device", 'copy forge:build forge:ios_device');
```
