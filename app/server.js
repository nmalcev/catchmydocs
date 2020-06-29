const $http = require('http');
const $fs = require('fs');
const $path = require('path');

const PORT = process.env.PORT || 8080;
const FOLDER_ROOT = $path.resolve(process.env.ROOT || './');
const F404 = $path.resolve(process.env.F404 || FOLDER_ROOT + '/index.html');

const IMG_BLACK = 'R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
const IMG_TRANSPARENT = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

function isEndsOn(str, char) {
    return str[str.length - 1] === char;
}

const server = $http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'GET') {
        const fpath = FOLDER_ROOT + req.url + (isEndsOn(req.url, '/') ? 'index.html' : '');
        const acceptHeader = req.headers['accept'] || req.headers['Accept'] || '';

        if (!acceptHeader) {
            console.warn('No AcceptHeader');
            console.dir(req.headers);
        }
        $fs.readFile(fpath, function(err, source){
            if (err) console.dir(err);
            
            if (err) {
                if (acceptHeader.includes('text/html')) {
                    $fs.readFile(F404, function(err, html404){
                        res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
                        res.write(!err ? html404 : '');
                        res.end();
                    });
                } else if (acceptHeader.includes('image/*')) {
                    let base64px = IMG_BLACK;
                    let img = Buffer.from(base64px, 'base64');

                    res.writeHead(200, {
                        'Content-Type': 'image/gif',
                        'Content-Length': img.length
                    });
                    res.end(img); 
                } else  {
                    res.writeHead(404);
                    res.end();
                }
            } else {
                res.writeHead(200, 'OK', { 
                    'Content-Type': acceptHeader.includes('text/css') ? 'text/css' :'text/html'
                });
                res.write(source);
                res.end();
            }
        });
    } else if (req.method === 'POST') {
        // TODO
    } else {
        // TODO
    }
});
server.listen(PORT);

console.log([FOLDER_ROOT, F404]);
console.log('The application host - localhost:%s', PORT);
