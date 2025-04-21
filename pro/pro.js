const activateProBtn = document.getElementById("activateProBtn");
activateProBtn.addEventListener("click", () => {
  checkAndActivatePro();
});
async function checkAndActivatePro() {
  const key = document.getElementById("licenseKey").value.trim();
  const message = document.getElementById("proMessage");
  if (key) {
    const valid = await verifyLicenseKey(key);
    if (valid) {
      chrome.storage.local.set({
        isPro: true,
        licenseKey: key,
        isTrial: false,
      });
      message.style.color = "green";
      message.textContent =
        "🎉✅ Kích hoạt thành công! Chào mừng bạn đến với bản Pro.";
      chrome.storage.sync.set({ sound: "forest" });
    } else {
      message.style.color = "red";
      message.textContent = "❌ Vui lòng nhập mã Pro hợp lệ.";
    }
  }
}

async function verifyLicenseKey(key) {
  const validKeys = ["ABC123", "XYZ789"];
  return validKeys.includes(key);
}
async function isProUser() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["isPro"], (data) => {
      resolve(data.isPro === true);
    });
  });
}
