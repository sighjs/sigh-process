# sigh-process

[![build status](https://circleci.com/gh/sighjs/sigh-process.png)](https://circleci.com/gh/sighjs/sigh-process)

This plugin is designed to run processes that run indefinitely. The first time the plugin instance receives an event it starts the configured process, on subsequent events it kills the running process and starts another. It forwards all input events but delays them until the process has output at least one line to standard output. In `watch` mode the plugin is a no-op.

## Example

`npm install --save-dev sigh-process` then add something like this to your `sigh.js`:
```javascript
var process

module.exports = function(pipelines) {
  pipelines.run = [ process('node server.js') ]
}
```

This would run the process whenever a source file is compiled:
```javascript
var glob, babel, write, process

module.exports = function(pipelines) {
  pipelines.build = [
    glob({ basePath: 'src' }, '**/*.js'),
    babel(),
    write('lib'),
    process('node lib/server.js'),
  ]
}
```
