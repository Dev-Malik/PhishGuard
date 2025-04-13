chrome.tabs.executeScript(
  {
    code: "window.location.href"
  },
  (results) => {
    const currentUrl = results[0];
    document.getElementById("status").textContent = `URL: ${currentUrl}`;
  }
);
