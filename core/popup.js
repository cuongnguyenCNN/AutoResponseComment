const intervalSelect = document.getElementById("interval");
const toggle = document.getElementById("enableToggle");
const chime = document.getElementById("chime");
const alertAlarm = document.getElementById("alert-alarm");
const activateProBtn = document.getElementById("activateProBtn");
const soundSelect = document.getElementById("sound-select");
const volumeSlider = document.getElementById("volume");
const previewBtn = document.getElementById("previewBtn");
const pausing = document.getElementById("pausing");

chrome.storage.sync.get(["sound"], ({ sound }) => {
  if (sound) {
    soundSelect.value = sound;
  }
});

// Save new selection
soundSelect.addEventListener("change", () => {
  chrome.storage.sync.set({ sound: soundSelect.value });
});
volumeSlider.addEventListener("input", () => {
  chrome.storage.sync.set({ volume: parseFloat(volumeSlider.value) });
});
let currentAudio = null;
previewBtn.addEventListener("click", () => {
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(
    chrome.runtime.getURL(`../audio/${soundSelect.value}.mp3`)
  );
  currentAudio.volume = parseFloat(volumeSlider.value);
  currentAudio.play();
});
pausing.addEventListener("click", () => {
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
});
chrome.storage.sync.get(["interval", "enabled"], (data) => {
  if (data.interval) intervalSelect.value = data.interval;
  toggle.checked = data.enabled !== false;
});

intervalSelect.addEventListener("change", () => {
  const minutes = parseInt(intervalSelect.value);
  chrome.storage.sync.set({ interval: minutes });
  chrome.runtime.sendMessage({ action: "updateAlarm", minutes });
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ enabled });
  if (enabled) {
    const minutes = parseInt(intervalSelect.value);
    chrome.runtime.sendMessage({ action: "updateAlarm", minutes });
  } else {
    chrome.alarms.clearAll();
  }
});
activateProBtn.addEventListener("click", () => {
  window.checkAndActivatePro();
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "playSound") {
    const audio = new Audio(`../audio/${soundSelect}`);
    audio.play().catch((err) => {
      console.log("Không phát được âm thanh:", err);
    });
  }
});
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "playSound") {
    chime.play();
    alertAlarm.play();
  }
});
chrome.storage.local.get(["isPro"], (data) => {
  if (data.isPro) {
    // Hiển thị tính năng Pro
    document.getElementById("proFeature").style.display = "block";
    document.getElementById("upgradeBtn").style.display = "none";
  } else {
    // Ẩn hoặc hiển thị nút nâng cấp
    document.getElementById("proFeature").style.display = "none";
    document.getElementById("upgradeBtn").style.display = "block";
  }
});
document.getElementById("exercise-box").innerText = window.getRandomExercise();
document.getElementById("newExercise").addEventListener("click", () => {
  document.getElementById("exercise-box").innerText =
    window.getRandomExercise();
});
document.getElementById("theme-select").addEventListener("change", function () {
  const theme = this.value;
  chrome.storage.sync.set({ theme });
  applyTheme(theme);
});

function applyTheme(theme) {
  const style = document.getElementById("theme-style");
  style.href = `../pro/themes.css#${theme}`;
}
