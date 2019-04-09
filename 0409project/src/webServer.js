const http = require('http');
const server = http.createServer((request,response)=>{
    response.writeHead(200, {
        'content-Type':'text/html'
    });
    response.end(
        `<div>Hello
        ${request.url}
        </div>
        `
    );
});
server.listen(3000);