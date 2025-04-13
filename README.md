

#  PhishGuard – Browser Extension for Phishing Detection

**PhishGuard** is a heuristic-based browser extension designed to detect and flag potentially malicious or phishing websites in real-time. It helps users stay safe from phishing attacks by analyzing key attributes of visited web pages including URLs, content, and form behaviors.

---

##  Features

-  **Heuristic-based Analysis:** Detects phishing attempts using multiple heuristic rules.
-  **URL Inspection:** Checks for suspicious patterns, subdomain abuse, and misspelled domain names.
-  **Content Analysis:** Flags deceptive elements such as fake login forms, excessive input fields, or misleading branding.
-  **Form Behavior Monitoring:** Identifies forms that submit data to suspicious or unknown domains.
- **Real-time Alerts:** Warns users with clear notifications when a site exhibits phishing-like behavior.





The extension consists of:

- `manifest.json` – Configuration file for browser extension permissions and scripts.
- `background.js` – Handles runtime events and supports message passing.
- `content.js` – Analyzes DOM content of visited pages for phishing indicators.
- `urlChecker.js` – Evaluates URL structures and subdomains.
- `formScanner.js` – Scans forms for suspicious action endpoints and field patterns.
- `popup.html` & `popup.js` – Displays detection results and user-facing info in the extension UI.
- `styles.css` – Styling for the extension popup UI.

---

## ⚙️ Installation (For Developers)

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/phishguard-extension.git
