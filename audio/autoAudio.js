const chime = document.getElementById("chime");
const alertAlarm = document.getElementById("alert-alarm");
const soundSelect = document.getElementById("sound-select");
const birds = document.getElementById("birds");
const stream = document.getElementById("stream");
const forest = document.getElementById("forest");
const funny1 = document.getElementById("funny1");
const funny2 = document.getElementById("funny2");
const funny3 = document.getElementById("funny3");
function OpenAudio() {
  debugger;
  chrome.storage.sync.get(["sound", "volume"], ({ sound, volume }) => {
    let audioToPlay;
    switch (sound) {
      case "forest":
        audioToPlay = document.getElementById("forest");
        break;
      case "stream":
        audioToPlay = document.getElementById("stream");
        break;
      case "birds":
        audioToPlay = document.getElementById("birds");
        break;
      case "funny1":
        audioToPlay = document.getElementById("funny1");
        break;
      case "funny2":
        audioToPlay = document.getElementById("funny2");
        break;
      case "funny3":
        audioToPlay = document.getElementById("funny3");
        break;
      default:
        audioToPlay = document.getElementById("alert-alarm"); // fallback mặc định
    }
    if (audioToPlay) {
      audioToPlay.currentTime = 0;
      audioToPlay.volume = volume ?? 1.0;
      audioToPlay.play().catch((err) => {
        console.error("Không thể phát âm thanh:", err.message);
      });
    }
  });
}
document.addEventListener("DOMContentLoaded", OpenAudio);
