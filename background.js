chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "phishingStatus") {
    const iconPath = {
      safe: "icon-safe.png",
      alert: "icon-alert.png",
      danger: "icon-danger.png"
    };

    chrome.action.setIcon({
      tabId: sender.tab.id,
      path: iconPath[message.level]
    });
  }
});
