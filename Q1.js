const http = require ("http")
const fs = require ('fs')
const path = require('path')


const port = 3003
const host_name = "localhost"

const server= http.createServer(requestHandler)


server.listen(port, host_name, () => {
    console.log(`server started sucessfully at http://${host_name}:${port}`)

})

function requestHandler(req, res) {

if (req.url === "/") {

    renderWebPage(req, res)
}


if (req.url.endsWith('.html'))
try {
     renderWebPage(req, res);
    }
    catch(error){
         renderErrorPage(req, res)
    }


}


 //Functions to render page according to URL entered
function renderWebPage(req, res){

    const splitReqUrl = req.url.split('/')
    const fileName = splitReqUrl[1]
    const filePath = path.join(__dirname, fileName)
    

    const file = fs.readFileSync(filePath)
    res.setHeader('content-type', 'text.html')
    res.writeHeader(200)
    res.end(file)
}

function renderErrorPage (req, res) {
    const errorFile = path.join(__dirname, '404.html')
    const file = fs.readFileSync(errorFile)
    res.setHeader('content-type', 'text.html')
    res.writeHeader(404)
    res.end(file)


}