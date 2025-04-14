const intervalSelect = document.getElementById("interval");
const toggle = document.getElementById("enableToggle");
const chime = document.getElementById("chime");
const alertAlarm = document.getElementById("alert-alarm");

// Khôi phục cài đặt
chrome.storage.sync.get(["interval", "enabled"], (data) => {
  if (data.interval) intervalSelect.value = data.interval;
  toggle.checked = data.enabled !== false;
});

// Lưu thay đổi
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

// Lắng nghe để phát âm thanh
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "playSound") {
    chime.play();
    alertAlarm.play();
  }
});
