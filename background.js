function setAlarm(minutes) {
  chrome.alarms.clearAll(() => {
    chrome.alarms.create("standUpReminder", { periodInMinutes: minutes });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["enabled", "interval"], (data) => {
    if (data.enabled !== false) {
      setAlarm(data.interval || 20);
    }
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "standUpReminder") {
    chrome.storage.sync.get("enabled", (data) => {
      if (data.enabled !== false) {
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "Đã đến giờ rồi!",
          message: "Hãy đứng dậy và vận động nhé 🚶‍♀️",
          priority: 2,
        });

        // Phát âm thanh
        chrome.runtime.sendMessage({ action: "playSound" });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateAlarm") {
    setAlarm(request.minutes);
  }
});
