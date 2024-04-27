console.log("Inside 'content.js'");
//Listen to messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Inside onMessage");
    console.log("unpacked message :-",message);
    // console.log(message, sender, sendResponse)
    // const {hostname, password} = message;
    console.log(message.msg["hostname"]);
    console.log(message.msg["password"]);
    if (message.msg['hostname'] === window.location.hostname) {
        
      // Verify password and send response back to background script (optional)
        var lock = 0 //0 - lock | 1 - unlock
        while (lock == 0) {
            const password = prompt("This site is locked. Please enter password:");
            if (password === message.msg["password"]) {
                console.log("Access Granted!!!");
                lock = 1;
    
            } else {
                window.alert("Wrong Password");
            }
        }
        
    }
  });
  