'use strict';

const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('read-file', () => {
    let nodeFileEval, readFileStub, nodeEvalStub;

    beforeEach(() => {
        readFileStub = sinon.stub().resolves('{}');
        nodeEvalStub = sinon.stub().returns({});

        nodeFileEval = proxyquire('../index.js', {
            'node-eval': nodeEvalStub,
            fs: { readFile: readFileStub }
        });
    });

    it('should read with `utf-8` encoding by default', () => {
        const filename = 'file.js';

        nodeFileEval(filename);

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'utf-8' });
    });

    it('should read with specified encoding', () => {
        const filename = 'file.js';

        nodeFileEval(filename, { encoding: 'ascii' });

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'ascii' });
    });

    it('should support encoding as string argument', () => {
        const filename = 'file.js';

        nodeFileEval(filename, 'ascii');

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { encoding: 'ascii' });
    });

    it('should read with specified flag', () => {
        const filename = 'file.js';

        nodeFileEval(filename, { flag: 'r' });

        expect(readFileStub).to.be.calledWithMatch(sinon.match.string, { flag: 'r' });
    });
});
