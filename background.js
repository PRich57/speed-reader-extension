chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getText') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: extractText,
        },
        (results) => {
          if (results && results[0] && results[0].result) {
            chrome.runtime.sendMessage({ action: 'extractedText', text: results[0].result });
          }
        }
      );
    });
  }
});

function extractText() {
  const documentClone = document.cloneNode(true);
  const reader = new Readability(documentClone);
  const article = reader.parse();
  return article && article.textContent ? article.textContent : document.body.innerText;
}
