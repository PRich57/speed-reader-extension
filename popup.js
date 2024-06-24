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
        document.getElementById('reader').textContent = words[currentIndex++];
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
