const LOCK_TIMEOUT = 1 * 60 * 1000; // 1 minutes in milliseconds
const lockedUrls = new Map();
console.log("Background script running...");

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("inside onUpdated");
  if (changeInfo.status === 'complete' || changeInfo.status === 'undefined') {
    console.log("Inside if");
    chrome.storage.sync.get('lockedUrls', (data) => {
      const storedLockedUrls = new Map(data.lockedUrls ? data.lockedUrls.map(urlData => [urlData.url, urlData.password]) : []);
      console.log("Locked Urls :- ", storedLockedUrls);

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const currentTab = tabs[0];
          const url = new URL(currentTab.url);
          const hostname = url.hostname;
        //   const password = storedLockedUrls.get(url);
          console.log("Hostname",hostname);
          console.log("URL",url.origin);
        //   console.log("Password",password)

        //   if (storedLockedUrls.keys().some(url => url.includes(hostname))) {
        //     const password = storedLockedUrls.get(url);
        //     console.log("Password",password);
        //     // message = { hostname, password };
        //     // console.log("Message :- ", message);
        //     chrome.tabs.sendMessage(tabId, {msg: { hostname, password }});
        //   }

        for (const url of storedLockedUrls.keys()) {
            if (url.includes(hostname)) {
                const password = storedLockedUrls.get(url);
                console.log("Password:", password);
                // If you want to send a message to chrome tabs, you can do it here
                chrome.tabs.sendMessage(tabId, {msg: { hostname, password}});
            }
        }
        //    else {
        //     console.log("Current URL is not locked.");
        //   }
        // } else {
        //   console.log("No active tab found.");
        }
      });
    });
  }
});
