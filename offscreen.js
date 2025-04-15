chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "play-sound") {
    const audio = new Audio("chime.mp3");
    audio.play();
  }
});
