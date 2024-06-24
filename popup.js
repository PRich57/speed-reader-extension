let running = false;
let intervalId;
let words = [];
let currentIndex = 0;

document.getElementById('start').addEventListener('click', startReading);
document.getElementById('stop').addEventListener('click', stopReading);
document.getElementById('speed').addEventListener('input', updateSpeed);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractedText') {
    words = request.text.split(/\s+/);
  }
});

chrome.runtime.sendMessage({ action: 'getText' });

function startReading() {
  if (!running && words.length > 0) {
    running = true;
    const speed = parseInt(document.getElementById('speed').value, 10);

    intervalId = setInterval(() => {
      if (currentIndex < words.length) {
        displayWord(words[currentIndex++]);
      } else {
        stopReading();
      }
    }, speed);
  }
}

function stopReading() {
  running = false;
  clearInterval(intervalId);
}

function updateSpeed() {
  const speed = document.getElementById('speed').value;
  document.getElementById('speedValue').textContent = speed;
  if (running) {
    stopReading();
    startReading();
  }
}

function displayWord(word) {
  const reader = document.getElementById('reader');
  reader.textContent = word;

  // Adjust font size based on word length
  if (word.length > 10) {
    reader.style.fontSize = '32px';
  } else if (word.length > 7) {
    reader.style.fontSize = '40px';
  } else {
    reader.style.fontSize = '48px';
  }
}
