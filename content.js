importScripts('readability.js');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractText') {
    const documentClone = document.cloneNode(true);
    const reader = new Readability(documentClone);
    const article = reader.parse();

    if (article && article.textContent) {
      sendResponse({ text: article.textContent });
    } else {
      sendResponse({ text: document.body.innerText });
    }
  }
});
