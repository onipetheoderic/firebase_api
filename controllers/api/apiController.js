const jwt = require('jsonwebtoken');
var Request = require("request");
/* A get route which accepts the user token as an header */
/* all_assigned_contracts/:type{road or bridge or housing or national}*/

exports.send_notification = function(req, res){
    const url = "https://fcm.googleapis.com/fcm/send";
    console.log("reqbody",req.body)
    const title = req.body.title;
    const body = req.body.body;
    const reciever_token = req.body.reciever_token;
    const server_token = req.body.server_token;
    Request.post({
        "headers": { 
            "Authorization":`key=${server_token}`,
            "Content-type": "application/json" 
        },
        "url": url,
        "body": JSON.stringify({            
                to : reciever_token,
                collapse_key : "type_a",
                notification : {
                    body : body,
                    title: title
                }
               
        })
    }, (error, response, body) => {
    // console.log(error, response, body)
    if(error) {
        console.log(error)
        res.json(error)
    }
    else{
        console.log("RRRRRRRRRRRR",response)
         res.json({success:true, response:JSON.parse(response.body)}) 
    }       

    });
}
