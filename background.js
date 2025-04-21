// Tải cấu hình từ storage và setup báo lại mỗi X phút
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["interval", "enabled"], (data) => {
    const minutes = parseInt(data.interval) || 20;
    chrome.alarms.create("standUpReminder", { periodInMinutes: minutes });
  });
});
const TRIAL_DURATION_HOURS = 24;

// Khi extension được cài
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    const now = Date.now();
    chrome.storage.local.set(
      { pro_trial_start: now, isPro: false, isTrial: true },
      () => {
        console.log("Dùng thử Pro được kích hoạt trong 24h từ:", new Date(now));
      }
    );
    chrome.storage.sync.set({
      interval: 5,
      sound: "alert-alarm",
      enabled: true,
    });
  }
});
// Khi người dùng đổi cài đặt => update alarm
chrome.storage.onChanged.addListener((changes) => {
  if (changes.interval) {
    chrome.alarms.clear("standUpReminder", () => {
      const minutes = parseInt(changes.interval.newValue) || 20;
      chrome.alarms.create("standUpReminder", { periodInMinutes: minutes });
    });
  }
});

// Khi alarm chạy -> hiện notification
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "standUpReminder") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon.png",
      title: "Đã đến lúc đứng dậy!",
      message: "Hãy đứng lên và đi lại một chút nhé 🧍‍♂️",
      priority: 2,
    });

    // Optional: play sound
    chrome.storage.sync.get("enabled", (data) => {
      if (data.enabled) {
        chrome.tabs.create(
          {
            url: chrome.runtime.getURL("audio/audio.html"),
            active: true,
          },
          function (tab) {
            setTimeout(() => {
              chrome.tabs.remove(tab.id); // đóng lại sau 5 giây
            }, 30000);
          }
        );
        // chrome.runtime.sendMessage({ type: "playSound" });
        // const audio = new Audio("chime.mp3");
        // audio.play().catch((e) => console.log("Không thể phát âm thanh", e));
      }
    });
  }
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "updateAlarm") {
//     setAlarm(request.minutes);
//   }
// });
