chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  let url = tabs[0].url;
  let parsed = new URL(url);

  document.getElementById("site").innerText = parsed.hostname;

  let score = 100;
  let phishing = "Low";

  if (parsed.protocol === "https:") {
    document.getElementById("protocol").innerText = "HTTPS";
    document.getElementById("ssl").innerText = "Secure";
  } else {
    document.getElementById("protocol").innerText = "HTTP";
    document.getElementById("ssl").innerText = "Not Secure";
    score -= 40;
  }

  let keywords = ["login", "verify", "bank", "secure", "update"];
  keywords.forEach(word => {
    if (url.toLowerCase().includes(word)) {
      phishing = "Medium";
      score -= 15;
    }
  });

  if (url.length > 75) {
    phishing = "High";
    score -= 20;
  }

  if (score < 0) score = 0;

  document.getElementById("score").innerText = score;
  document.getElementById("phishing").innerText = phishing;
});
