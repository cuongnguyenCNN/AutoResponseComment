// trial.js

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const TRIAL_DURATION_HOURS = 3 * 24 * 60;
const TRIAL_DURATION_MINUTES = 30;

function startProTrial(callback) {
  const now = Date.now();
  chrome.storage.local.set({ pro_trial_start: now }, () => {
    callback && callback(true);
  });
}

function checkProTrial(callback) {
  chrome.storage.local.get("pro_trial_start", (result) => {
    const start = result.pro_trial_start;
    if (start) {
      //const elapsed = Date.now() - start;
      const elapsed = (Date.now() - start) / (1000 * 60); // giờ
      if (elapsed <= TRIAL_DURATION_HOURS) {
        const hoursLeft = TRIAL_DURATION_HOURS - elapsed;
        callback(true, hoursLeft);
      } else {
        chrome.storage.local.remove("pro_trial_start");
        callback(false);
      }
    } else {
      callback(false);
    }
  });
}
window.checkProTrial = checkProTrial;
