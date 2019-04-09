const http = require('http');
const fs = require('fs');
http.createServer((request,response)=>{
    // 如果request的網址不等於路徑的話直接回傳
    if(request.url !== '/') return;
    
    
    // 寫入檔案
    fs.writeFile(
        // 1.路徑 + (文件名)
        __dirname+'header01.json',
        // 2.內容
        JSON.stringify(request.headers),
        // 3.CallBackFunction
        error=>{
            if(error){
                return console.log(error);
            } else{
                console.log('HTTP已完成擋頭儲存');
            }
        });

    // 讀取檔案
    fs.readFile(
        // 1.路徑 + (文件名)
        __dirname+'data01.html',
        // 2.Call Back Function (框框內為錯誤與資料)
        (error , data)=>{

            // 如果沒有跑錯就執行html  反之就跳出錯誤訊息
            if(!error){
                response.writeHead(200,{'Content-Type}':'text/html'});
                response.end(data);
            }else{
                response.writeHead(500,{'Content-Type':'text/plain'});
                response.end('500 - 伺服器錯誤');
            }
        }
    );
}).listen(3000);