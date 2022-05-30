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
                    if (site.pattern.test(current_tab_info.url)) {
                        var resourceUrl = chrome.runtime.getURL(site.file);
                        var actualCode =`
                            if (document.getElementById('injected_Script') == null) {
                                console.log('Script Injected');
                                var s = document.createElement('script');
                                s.src = "${resourceUrl}";
                                s.id = 'injected_Script';
                                // console.log(document.head);
                                document.head.appendChild(s);
                            }
                            else {
                                console.log("Not Injected");
                            }`

                        chrome.tabs.executeScript(tabId,{code:actualCode},);

                        // console.log(current_tab_info.url);
                        break;
                    }
                }
            });
        }
    });

});

function editCSPHeader(r) {
    console.log('maati');
    const headers = r.responseHeaders; // original headers
    for (let i=headers.length-1; i>=0; --i) {
        let header = headers[i].name.toLowerCase();
        if (header === "content-security-policy") { 
            headers[i].value = headers[i].value.replace("connect-src", "connect-src https://mocki.io");
        }
    }
    return {responseHeaders: headers};
}

chrome.webRequest.onHeadersReceived.addListener(
    editCSPHeader,
    {
        urls: [ "<all_urls>" ],
        types: [ "sub_frame","main_frame" ]
    },
    ["blocking", "responseHeaders","extraHeaders"]
  );



