async function checkAndActivatePro() {
  debugger;
  const key = document.getElementById("licenseKey").value.trim();
  if (key) {
    const valid = await verifyLicenseKey(key);
    if (valid) {
      chrome.storage.local.set({ isPro: true, licenseKey: key });
      document.getElementById("proStatus").innerText =
        "🎉 Kích hoạt Pro thành công!";
    } else {
      document.getElementById("proStatus").innerText = "❌ Mã không hợp lệ.";
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

window.checkAndActivatePro = checkAndActivatePro;
