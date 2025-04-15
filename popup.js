const intervalSelect = document.getElementById("interval");
const toggle = document.getElementById("enableToggle");
const chime = document.getElementById("chime");
const alertAlarm = document.getElementById("alert-alarm");

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
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "playSound") {
    const audio = new Audio("chime.mp3");
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
