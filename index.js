'use strict';

const path = require('path');
const fs = require('fs');

const promisify = require('es6-promisify');
const nodeEval = require('node-eval');

const readFile = promisify(fs.readFile);

/**
 * Helper to prepare options for fs.readFile
 *
 * @param {Object|string} [options] Options or encoding
 * @param {string}        [options.encoding=utf-8] The file encoding.
 * @param {string}        [options.flag=r]         The flag mode.
 * @param {Object}        [options.context]        The object to provide into execute method.
 *
 * @returns {Object}
 */
const getFileOpts = options => {
    const opts = typeof options === 'string' ? { encoding: options } : options || {};
    const fileOpts = {
        encoding: opts.encoding || 'utf-8',
        flag: opts.flag
    };

    return fileOpts;
}

/**
 * Reads file and evals it.
 *
 * Like `require`, but asynchronous and doesn't use the module cache.
 *
 * Important: internally will resolve passed relative paths with `path.resolve()`, not `require.resolve()`.
 *
 * @param {string}        file                     The filename.
 * @param {Object|string} [options]                Options or encoding.
 * @param {string}        [options.encoding=utf-8] The file encoding.
 * @param {string}        [options.flag=r]         The flag mode.
 * @param {Object}        [options.context]        The object to provide into execute method.
 *
 * @returns {Promise}
 */
const nodeFileEval = (file, options) => {
    const filename = path.resolve(file);
    const fileOpts = getFileOpts(options);

    return readFile(filename, fileOpts)
        .then(contents => nodeEval(contents, filename, options && options.context));
};

/**
 * Synchronously reads file and evals it.
 *
 * Like `require`, but doesn't use the module cache.
 *
 * Important: internally will resolve passed relative paths with `path.resolve()`, not `require.resolve()`.
 *
 * @param {string}        file                     The filename.
 * @param {Object|string} [options]                Options or encoding.
 * @param {string}        [options.encoding=utf-8] The file encoding.
 * @param {string}        [options.flag=r]         The flag mode.
 * @param {Object}        [options.context]        The object to provide into execute method.
 *
 * @returns {*}
 */
const nodeFileEvalSync = (file, options) => {
    const filename = path.resolve(file);
    const fileOpts = getFileOpts(options);
    const contents = fs.readFileSync(filename, fileOpts);

    return nodeEval(contents, filename, options && options.context);
};

module.exports = nodeFileEval;
module.exports.sync = nodeFileEvalSync;
