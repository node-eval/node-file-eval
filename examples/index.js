const path = require('path');

const fileEval = require('../index');

const filenames = ['file.js', 'file.json'];

filenames.forEach(name => {
    const filename = path.join(__dirname, 'fixtures', name);

    fileEval(filename)
        .then(console.log)
        .catch(console.error);
});
