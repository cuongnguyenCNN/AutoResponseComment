const chime = document.getElementById("chime");
const alertAlarm = document.getElementById("alert-alarm");
const soundSelect = document.getElementById("sound-select");
function OpenAudio() {
  debugger;
  chrome.storage.sync.get(["sound", "volume"], ({ sound, volume }) => {
    let audioToPlay;
    switch (sound) {
      case "forest":
        audioToPlay = document.getElementById("chime");
        break;
      case "stream":
        audioToPlay = document.getElementById("alert-alarm");
        break;
      default:
        audioToPlay = document.getElementById("chime"); // fallback mặc định
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
