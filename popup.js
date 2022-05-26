let toggleButton = document.getElementById("check");

setInitialSwitchState = () => {
  chrome.storage.sync.get("switchStatus", ({ switchStatus }) => {
    if (switchStatus === true) {
      toggleButton.checked = true;
    }
    else {
      toggleButton.checked = false;
    }
  })
}
setInitialSwitchState();