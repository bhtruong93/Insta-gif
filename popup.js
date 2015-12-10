chrome.browserAction.onClicked.addListener(function(currentTab) {
  chrome.tabs.create({ url: "index.html" });
});
