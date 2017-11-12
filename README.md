node-file-eval
==============

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][david-img]][david]

[npm]:          https://www.npmjs.org/package/node-file-eval
[npm-img]:      https://img.shields.io/npm/v/node-file-eval.svg

[travis]:       https://travis-ci.org/node-eval/node-file-eval
[test-img]:     https://img.shields.io/travis/node-eval/node-file-eval/master.svg?label=tests

[coveralls]:    https://coveralls.io/r/node-eval/node-file-eval
[coverage-img]: https://img.shields.io/coveralls/node-eval/node-file-eval/master.svg

[david]:        https://david-dm.org/node-eval/node-file-eval
[david-img]:    http://img.shields.io/david/node-eval/node-file-eval/master.svg

Read file and eval it. Uses [node-eval](https://github.com/node-eval/node-eval).

Like `require`, but asynchronous and doesn't use the module cache.

**Important:** internally `node-file-eval` will resolve passed relative paths with `path.resolve()`, not `require.resolve()`.

Install
-------

```
$ npm install --save node-file-eval
```

Usage
-----

```js
const nodeFileEval = require('node-file-eval');

fileEval('./path/to/file.js')
    .then(console.log)
    .catch(console.log);
```

API
---

### nodeFileEval(file[, options])

### file

Type: `string`.

The filename or file descriptor.

The `node-file-eval` determinate format by extension. If filename ends with `.json` extention, its contents will be parsing with `JSON.parse`. If filename ends with `.js`, its contents will be evaluating with [vm](https://nodejs.org/dist/latest/docs/api/vm.html).

By default expected JS-expression or CommonJS module contents.

#### options

Type: `Object`, `string`.

Options or encoding.

#### options.encoding

Type: `string`.

Default: `utf-8`.

The file encoding.

#### options.flag

Type: `string`.

Default: `r`.

The flag mode.

#### options.context

Type: `Object`.

The object to provide into execute method.

If `context` is specified, then module contents will be evaluating with `vm.runInNewContext`.

If `context` is not specified, then module contents will be evaluating with `vm.runInThisContext`.

With context you can provide some like-a-global variables into `node-file-eval`.

```js
const nodeFileEval = require('node-file-eval');

const secretKey = '^___^';
const contents = 'module.exports = secretKey;';

// The file has the contents "module.exports = secretKey;"
nodeFileEval('./path/to/file.js', {
    context: { secretKey }
});

// ➜ '^___^'
```

### nodeFileEval.sync(file[, options])

Synchronous version of [nodeFileEval](#fileevalfile-options).

Method signature is same.

Formats
-------

Supports [CommonJS](#commonjs), [JSON](#json) and [JSON5](#json5) formats.

> See [examples](./examples) with evaluating files with different formats.

### CommonJS

Evaluates `CommonJS` files with `.js` extention.

```js
const nodeFileEval = require('node-file-eval');

// export data with `module.exports` or `exports`
nodeFileEval('path/to/file.js');
```

### JSON

Evaluates `JSON` files with `.json` extention.

```js
const nodeFileEval = require('node-file-eval');

nodeFileEval('path/to/file.json');
```

Related
-------

* [node-eval](https://github.com/node-eval/node-eval) — eval Node.js contents only (JS-expression, CommonJS modules and JSON).
* [any-eval](https://github.com/node-eval/any-eval) — eval any contents (JS-expression, CommonJS modules and JSON/JSON5).
* [file-eval](https://github.com/node-eval/file-eval) — read any file and eval it with [any-eval](https://github.com/node-eval/any-eval).

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
