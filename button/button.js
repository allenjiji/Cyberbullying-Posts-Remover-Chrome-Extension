var checkInput = document.getElementById('check');
var on = document.getElementsByClassName('on');
var off = document.getElementsByClassName('off');


refreshTabs = async () => {
  var patterns = [
    /^https:\/\/twitter/, /^https:\/\/www\.facebook/, /^https:\/\/www\.youtube/, /^https:\/\/www\.instagram/
  ]
  // let [tab] = await chrome.tabs.query({ currentWindow: true })
  // for (var pattern in patterns) {
  //   if (pattern.test())
  // }
  chrome.tabs.reload();
}

checkInput.addEventListener('click', () => {

  chrome.storage.sync.get("switchStatus", ({ switchStatus }) => {
    if (switchStatus == true) {
      on[0].style.color = "#253b52";
      off[0].style.color = "red";
    }
    else {
      on[0].style.color = "#03fe39";
      off[0].style.color = "#253b52";
    }
    switchStatus = !switchStatus
    chrome.storage.sync.set({ switchStatus })
    refreshTabs()

  })
})