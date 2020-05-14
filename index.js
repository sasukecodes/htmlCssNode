const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res)=> {
    //console.log(req.url);
    // if(req.url === '/')
    // {
    //     fs.readFile(
    //     path.join(__dirname,'public','another.html'), 
    //     (err,content)=>{
    //         if(err) throw err;
    //         res.writeHead(200,{'Content-Type':'text/html'});
    //         res.write(content);
    //         res.end('newwwwwwwwwww');
    //     });



    //     // res.write('<h1>home</h1>');
    //     // res.end('end of parsing');
    // }
    
   //res.write('<h1>home</h1>');
   //res.end('end of parsing');

   let filepath = path.join(__dirname,'public',req.url === '/' ? 'index.html' :req.url);

   console.log(req.url);

   let extname = path.extname(filepath);

   let contentType = 'text/html';

   switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  fs.readFile(filepath,(err,content)=>{
      if(err){
          fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>
          {
              res.writeHead(200,{'Content-Type':'text/html'});
              res.end(content,'utf8');
          })
      }
      else{
          res.writeHead(200,{'Content-Type':contentType});
          res.end(content,'utf8');
      }
  })
   
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {console.log(`server running on port ${PORT}`);
});