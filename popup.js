let toggleButton = document.getElementById("toggle");

refreshTabs = async () => {
  var patterns = [
    /^https:\/\/twitter/, /^https:\/\/www\.facebook/, /^https:\/\/www\.youtube/, /^https:\/\/www\.instagram/
  ]
  chrome.tabs.reload();
}

(function () {
  chrome.storage.sync.get("switchStatus", ({ switchStatus }) => {
    if (switchStatus === true) {
      toggleButton.checked = true;
      document.body.style.backgroundColor = "#2b7f3a";
    }
    else {
      toggleButton.checked = false;
      document.body.style.backgroundColor = "#575757";
    }
    toggleButton.setAttribute("aria-checked", toggleButton.checked);
  })
}());

toggleButton.addEventListener("change", function () {
  chrome.storage.sync.get("switchStatus", ({ switchStatus }) => {
    toggleButton.setAttribute("aria-checked", toggleButton.checked);
    if (toggleButton.checked) document.body.style.backgroundColor = "#2b7f3a";
    else document.body.style.backgroundColor = "#575757";
    switchStatus = !switchStatus;
    chrome.storage.sync.set({ switchStatus });
    refreshTabs();
  });

});