function logStandUp() {
  const today = new Date().toISOString().split("T")[0];
  chrome.storage.local.get(["stats"], ({ stats = {} }) => {
    stats[today] = (stats[today] || 0) + 1;
    chrome.storage.local.set({ stats });
  });
}

function getWeeklyStats(callback) {
  chrome.storage.local.get(["stats"], ({ stats = {} }) => {
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      result.push({ date: key, count: stats[key] || 0 });
    }
    callback(result);
  });
}
