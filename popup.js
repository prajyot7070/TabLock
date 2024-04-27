document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('url-input');
    const passwordInput = document.getElementById('password-input');
    const addUrlButton = document.getElementById('add-url');
    const urlList = document.getElementById('url-list');
  
    // Create a Map to store URL-password pairs
    const lockedUrls = new Map();
  
    // Retrieve locked URLs from storage
    chrome.storage.sync.get('lockedUrls', function(data) {
      if (data.lockedUrls) {
        data.lockedUrls.forEach(function(urlData) {
          lockedUrls.set(urlData.url, urlData.password);
          addUrlToList(urlData.url);
        });
      }
    });
  
    addUrlButton.addEventListener('click', function() {
      const url = urlInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (url && password) {
        if (lockedUrls.has(url)) {
          alert('URL already locked!');
        } else {
          lockedUrls.set(url, password);
          addUrlToList(url);
          saveLockedUrls();
          urlInput.value = '';
          passwordInput.value = '';
        }
      }
    });
  
    function addUrlToList(url) {
      const listItem = document.createElement('li');
      listItem.textContent = url;
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
        lockedUrls.delete(url);
        listItem.remove();
        saveLockedUrls();
      });
  
      listItem.appendChild(removeButton);
      urlList.appendChild(listItem);
    }
  
    function saveLockedUrls() {
      const lockedUrlsData = Array.from(lockedUrls).map(([url, password]) => ({ url, password }));
      chrome.storage.sync.set({ 'lockedUrls': lockedUrlsData });
    }

    console.log(lockedUrls)
  });