'use strict';

const path = require('path');

const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('node-eval', () => {
    let nodeFileEval, nodeEvalStub, readFileStub;

    beforeEach(() => {
        nodeEvalStub = sinon.stub().returns({});
        readFileStub = sinon.stub().resolves('{}');

        nodeFileEval = proxyquire('../index.js', {
            'node-eval': nodeEvalStub,
            fs: { readFile: readFileStub }
        });
    });

    it('should provide file contents to `node-eval`', () => {
        const filePath = 'file.js';
        const fileContents = '{}';

        return nodeFileEval(filePath)
            .then(() => {
                expect(nodeEvalStub).to.be.calledWith(fileContents, sinon.match.string);
            });
    });

    it('should provide absolute filename to `node-eval`', () => {
        const filePath = 'file.js';

        return nodeFileEval(filePath)
            .then(() => {
                const filename = path.resolve(filePath);

                expect(nodeEvalStub).to.be.calledWith(sinon.match.string, filename);
            });
    });

    it('should provide context to `node-eval`', () => {
        const filePath = 'file.js';
        const context = {};

        return nodeFileEval(filePath, { context })
            .then(() => {
                expect(nodeEvalStub).to.be.calledWith(sinon.match.string, sinon.match.string, context);
            });
    });
});
