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
                ];

                for (var site of sites) {
                    if (site.pattern.test(current_tab_info.url)) {
                        var resourceUrl = chrome.runtime.getURL(site.file);
                        console.log(chrome.runtime.id);
                        var actualCode = (rUrl) => {
                            if (document.getElementById("injected_Script") == null) {
                                console.log('Script Injected');
                                var s = document.createElement('script');
                                s.src = rUrl;
                                s.id = "injected_Script";
                                // console.log(document.head);
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

                        // console.log(current_tab_info.url);
                        break;
                    }
                }
            });
        }
    });
    // chrome.browsingData.remove({}, { serviceWorkers: true }, function () {});
});

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
      console.log(request.list_data);
      tmp_res=[];
      request.list_data.forEach((x)=>{
          if(x=="") tmp_res.push(false);
          else tmp_res.push(true);
      });

      const prediction_url="http://04b8-35-230-2-203.ngrok.io/predict/";
      fetch(prediction_url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data:request.list_data})
      }).then(data=>data.json()).then(res=>{
          console.log(res.data);
          sendResponse({list_data:res.data});
        });
    // sendResponse({list_data:tmp_res});
    // setTimeout(()=>{
    //     sendResponse({list_data:tmp_res});
    // },1000);
    return true;
    });