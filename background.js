let color = '#3aa757';
let switchStatus = false

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    chrome.storage.sync.set({ switchStatus })
});