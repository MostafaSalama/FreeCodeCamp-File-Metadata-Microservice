const path = require('path');
const http = require('http');
const fs =require('fs') ;
const util = require('util');
const formidable = require('formidable') ;

const server = http.createServer();

/**
 *
 * @param req {IncomingMessage}
 * @param res {ServerResponse}
 */
function handleRequest(req, res) {
    console.log(req.url);
    console.log(req.url==='/');

    if (req.url==='/') {
        fs.createReadStream('./index.html').pipe(res);
    }
    else if(req.url==="/upload") {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true ;
        form.parse(req, function(err, fields, files) {
            console.log('error',err);
            res.writeHead(200, {'content-type': 'text/plain'});
            if(files.fileUploaded.size){
            res.end(JSON.stringify({size:files.fileUploaded.size}));
            }
            res.end('error');
        });

    }
    else {
    res.end('another page');
    }
}
server.on('request', handleRequest);

server.listen(3000);
