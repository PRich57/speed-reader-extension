let running = false;
let intervalId;
let text = '';
let words = [];

document.getElementById('start').addEventListener('click', startReading);
document.getElementById('stop').addEventListener('click', stopReading);
document.getElementById('speed').addEventListener('input', updateSpeed);
document.getElementById('openFile').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});
document.getElementById('fileInput').addEventListener('change', loadFile);
document.getElementById('textInput').addEventListener('input', updateText);

function startReading() {
  if (!running && text) {
    running = true;
    let index = 0;
    const speed = parseInt(document.getElementById('speed').value, 10);

    intervalId = setInterval(() => {
      if (index < words.length) {
        document.getElementById('reader').textContent = words[index++];
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

function loadFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    text = e.target.result;
    words = text.split(/\s+/);
    document.getElementById('textInput').value = text;
  };
  reader.readAsText(file);
}

function updateText(event) {
  text = event.target.value;
  words = text.split(/\s+/);
}
