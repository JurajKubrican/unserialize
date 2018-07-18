const https = require('https');


module.exports = (context, cb) => {

    if (!context.query.url) {
        cb(1, 'url missing');
        return;
    }

    https.get(context.query.url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            cb(null, {text: data});
        });

    }).on("error", (err) => {
        cb(1, err.message);
    });
};