const http = require ("http")
const fs = require ('fs')
const path = require('path');


const port = 3005
const host_name = "localhost"

const groceriesDb = [];
const groceriesDbPath = path.join(__dirname, "database", "items.JSON")
console.log(groceriesDbPath)

const server= http.createServer(requestHandler)

server.listen(port, host_name, () => {
console.log(`server started sucessfully at http://${host_name}:${port}`)

})

// // requesthandlers


 function requestHandler(req,res) { 
console.log(req.url)

    if (req.url === '/groceries' && req.method === 'POST') {
        addGroceries(req, res); 
    }
    // else if (req.url === '/groceries' && req.method === 'GET') { 
        
    // }
    // else if (req.url === '/groceries' && req.method === 'GET') {
        
    // }
    // else if (req.url === '/groceries' && req.method === 'PUT') {
        
    // }
    // if (req.url === '/groceries' && req.method === 'DELETE') {
        
    //}
    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            message: 'Action is Invalid'
        }));
    }

}

// function

function addGroceries(req, res){
    const item = [];

    req.on('item', (chunk) => {
       item.push(chunk)
    })  
   req.on("end", () => {
    const parsedItem = Buffer.concat(item).toString()
    const newItem = JSON.parse(parsedItem)
    console.log({newItem})

})


fs.readFile(groceriesDbPath, "utf8", (err, item) =>{
    if (err) {console.log(err)
       res.writeHead(400)
        res.end("file cannot be read")
        }
    }
)
const oldItems = JSON.parse();
const allItems = [...oldItems, newItem]

fs.writeFile(groceriesDbPath, JSON.stringify(allItems), (err) => {
   if (err) {
   console.log(err);
   res.writeHead(500);
   res.end(JSON.stringify({
   message: 'Internal Server Error. Could not save item to database.'
   }));
        
 }
 })

   res.end()
}



// function getAllGrocerious(req, res){
// 
//     })

// }

// function getOneGrocery(req, res){
//   
//     })

// }

// function updateGrocery(req, res){
//   
//     })

// }

// function DeleteGrocery(req, res){
//    
//     })

// }

