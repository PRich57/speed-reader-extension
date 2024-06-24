chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getText') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'extractText' }, (response) => {
        if (response) {
          chrome.runtime.sendMessage({ action: 'extractedText', text: response.text });
        }
      });
    });
  }
});
