
function getPhishingFeatureScore() {
  const metaTag = document.querySelector('meta[name="phish-features"]');
  if (!metaTag) return null;
  try {
    const features = JSON.parse(metaTag.getAttribute("content"));
    let sum = 0;
    for (const key in features) {
      sum += parseFloat(features[key]);
    }
    return sum;
  } catch (error) {
    console.error("Error parsing phish-features meta tag", error);
    return null;
  }
}

/**
 * Creates a banner at the top of the page to display the phishing status.
 */
function showBanner(message, color) {
  const banner = document.createElement("div");
  banner.textContent = message;
  banner.style.position = "fixed";
  banner.style.top = "0";
  banner.style.left = "0";
  banner.style.width = "100%";
  banner.style.backgroundColor = color;
  banner.style.color = "white";
  banner.style.padding = "10px";
  banner.style.fontSize = "18px";
  banner.style.fontWeight = "bold";
  banner.style.zIndex = "9999";
  document.body.prepend(banner);
}

/**
 * Main detection logic:
 * 1. Try to get a feature score from a meta tag.
 * 2. If found, use a simple threshold: if (score < 0) then classify as phishing.
 * 3. Otherwise, fall back to the banned-domain check.
 */
(function() {
  const score = getPhishingFeatureScore();
  let prediction = 0; // default: safe

  if (score !== null) {
    
    prediction = score < 0 ? 1 : 0;
    console.log("PhishGuard feature sum:", score);
  } else {
    
    const bannedDomains = ["example-phish.com", "malicious-site.org", "evil.com"];
    const forms = document.getElementsByTagName("form");
    const pageHostname = window.location.hostname.replace(/^www\./, "").toLowerCase();
    for (let form of forms) {
      const formAction = form.getAttribute("action");
      if (formAction) {
        try {
          const urlObj = new URL(formAction);
          const formHostname = urlObj.hostname.replace(/^www\./, "").toLowerCase();
          if (formHostname && formHostname !== pageHostname && bannedDomains.includes(formHostname)) {
            prediction = 1;
            break;
          }
        } catch (e) {
          // Ignore malformed URLs.
        }
      }
    }
  }
  

  if (prediction === 1) {
    showBanner("⚠️ Warning: This page may be a phishing attempt!", "red");
    console.warn("PhishGuard: Phishing detected.");
  } else {
    showBanner("✅ This page appears safe.", "green");
    console.log("PhishGuard: Page is safe.");
  }
  

  chrome.runtime.sendMessage({
    type: "phishingStatus",
    level: prediction === 1 ? "danger" : "safe",
    url: window.location.href
  });
})();
