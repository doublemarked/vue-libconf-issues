# Project Overview

This is a sample project built with `--target lib` which exhibits a number of related issues. 

Associated Github Issues:
  - https://github.com/vuejs/vue-cli/issues/1250
  - https://github.com/vuejs/vue-cli/issues/1251
  - https://github.com/vuejs/vue-cli/issues/1252
  - https://github.com/vuejs/vue-cli/issues/1253

## Setup:

1. `npm install`
2. `npm run build`

### Observation #1: `vue inspect` does not accept `--target lib`

Running `vue inspect` produces inaccurate webpack config because it cannot be instructed to load the lib-specific configuration.

[GitHub Issue](https://github.com/vuejs/vue-cli/issues/1250)

### Observation #2: Chunk names are not respected

Recent PR https://github.com/vuejs/vue-cli/pull/1173 made it possible to specify chunk names for app builds but this configuration is clobbered by the lib build configuration.

[GitHub Issue](https://github.com/vuejs/vue-cli/issues/1251)

### Observation #3: vue config in package.json (or vue.config.js) is overwritten by lib configuration

Within the build process, webpack customizations (either via `configureWebpack` or `chainWebpack`) are applied before the configuration from resolveLibConfig.js. This makes it not possible to use custom webpack config to fix configuration issues like the chunk naming.

[GitHub Issue](https://github.com/vuejs/vue-cli/issues/1252)

### Observation #4: Dynamic hostname publicPath feature is broken for non-lazy imports

The library entry code sports the excellent idea of assigning Webpack's `publicPath` at runtime to allow modules to be used cross domain / webroot. Per the comments in resolveLibConfig.js:
```
  // use dynamic publicPath so this can be deployed anywhere
  // the actual path will be determined at runtime by checking
  // document.currentScript.src.
```

That functionality, implemented in `entry-lib.js`, unfortunately does not run early enough to affect resources that are loaded as part of the initial code chun. It seems to currently only work if you call `import()` later, after initial load. 

Demo: `npm run demo`

[GitHub Issue](https://github.com/vuejs/vue-cli/issues/1253)
