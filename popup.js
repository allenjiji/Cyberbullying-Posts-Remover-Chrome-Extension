// chrome.storage.sync.get("color", ({ color }) => {
//   changeColorButton.style.backgroundColor = color;
// });

// changeColorButton.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({
//     active: true,
//     currentWindow: true,

//   });
//   chrome.scripting.executeScript({
//     target: {
//       tabId: tab.id
//     },
//     function: setPageBackgroundColor,
//   });
// });

// function setPageBackgroundColor() {
//   chrome.storage.sync.get(["color", "switchStatus"], (result) => {
//     if (result.switchStatus === false) {
//       document.body.style.backgroundColor = result.color;
//       switchStatus = true
//       chrome.storage.sync.set({ switchStatus })
//     }
//     else {
//       document.body.style.backgroundColor = '#000000';
//       switchStatus = false
//       chrome.storage.sync.set({ switchStatus })
//     }
//   });
// }
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