let switchStatus = false

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ switchStatus })
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    chrome.storage.sync.get("switchStatus", ({ switchStatus }) => {
        if (switchStatus === true) {
            chrome.tabs.get(tabId, current_tab_info => {
                var sites = [
                    { pattern: /^https:\/\/twitter/, file: 'site_specific_scripts/twitter_patch.js' },
                    { pattern: /^https:\/\/www\.facebook/, file: 'site_specific_scripts/facebook_patch.js' },
                    { pattern: /^https:\/\/www\.youtube/, file: 'site_specific_scripts/youtube_patch.js' },
                    { pattern: /^https:\/\/www\.instagram/, file: 'site_specific_scripts/instagram_patch.js' },
                    // {pattern:/^https:\/\/www\.reddit/,file:'site_specific_scripts/reddit_patch.js'},
                ];

                for (var site of sites) {
                    console.log(site.pattern);
                    if (site.pattern.test(current_tab_info.url)) {
                        console.log("Inside if statement");
                        var resourceUrl = chrome.runtime.getURL(site.file);
                        console.log(resourceUrl);
                        var actualCode = (rUrl) => {
                            if (document.getElementById("injected_Script") == null) {
                                console.log('Script Injected');
                                var s = document.createElement('script');
                                s.src = rUrl;
                                s.id = "injected_Script"
                                console.log(document.head);
                                document.head.appendChild(s);
                            }
                            else {
                                console.log("Not Injected");
                            }
                        };

                        chrome.scripting.executeScript(
                            {
                                target: { tabId: tabId },
                                func: actualCode,
                                args: [resourceUrl],
                            });

                        console.log(current_tab_info.url);
                        break;
                    }
                }
            });
        }
    })

});

