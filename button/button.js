
var checkInput = document.getElementById('check');
var on = document.getElementsByClassName('on');
var off = document.getElementsByClassName('off');


refreshTabs = () => {
  chrome.tabs.reload();
}

checkInput.addEventListener('click', () => {

  chrome.storage.sync.get("switchStatus", ({ switchStatus }) => {
    if (switchStatus == true) {
      on[0].style.color = "#253b52";
      off[0].style.color = "red";
    }
    else {
      on[0].style.color = "green";
      off[0].style.color = "#253b52";
    }
    switchStatus = !switchStatus
    chrome.storage.sync.set({ switchStatus })
    refreshTabs()

  })
})