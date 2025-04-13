const bannedDomains = ["example-phish.com", "malicious-site.org", "evil.com"];

function normalizeHostname(hostname) {
  return hostname.replace(/^www\./, "").toLowerCase();
}

function getHostnameFromURL(url) {
  try {
    return normalizeHostname(new URL(url).hostname);
  } catch (e) {
    return null;
  }
}

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

(function () {
  const forms = document.getElementsByTagName("form");
  const heuristicsTriggered = [];

  const pageHostname = normalizeHostname(window.location.hostname);
  console.log("🔍 Current Page Hostname:", pageHostname);

  for (let form of forms) {
    const formAction = form.getAttribute("action");

    if (formAction) {
      const formActionHostname = getHostnameFromURL(formAction);
      console.log("📝 Form Action Hostname:", formActionHostname);

      if (
        formActionHostname &&
        formActionHostname !== pageHostname &&
        bannedDomains.includes(formActionHostname)
      ) {
        heuristicsTriggered.push(
          `Form submits to known malicious domain: ${formActionHostname}`
        );
      }
    }
  }

  if (heuristicsTriggered.length > 0) {
    showBanner("⚠️ Warning: This page may be a phishing attempt!", "red");
    console.warn("Phishing Heuristics Triggered:", heuristicsTriggered);
  } else {
    showBanner("✅ This page appears safe.", "green");
    console.log("No phishing indicators found.");
  }
})();
