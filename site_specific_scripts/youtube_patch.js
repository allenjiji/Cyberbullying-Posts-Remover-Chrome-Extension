const { fetch: originalFetch } = window;


window.fetch = async (...args) => {
    let [resource, config ] = args;

    var url=resource.url;
    // console.log(url);
    var response = await originalFetch(resource, config);

    if(url.indexOf('next?key') !== -1){
        console.log(url);
        var editorExtensionId = document.getElementById("injected_Script").className;

        const text_dup =async () =>{
            console.log("I reached Json");
            var tmp_cmnts=await response.clone().json();
                var cmnt_list=[];
                var iter=tmp_cmnts.onResponseReceivedEndpoints.at(-1).reloadContinuationItemsCommand?tmp_cmnts.onResponseReceivedEndpoints.at(-1).reloadContinuationItemsCommand:tmp_cmnts.onResponseReceivedEndpoints.at(-1).appendContinuationItemsAction;
                if(!iter) return JSON.stringify(tmp_cmnts);
                iter.continuationItems.slice(0,-1).forEach((cmntObj,i)=>{
                var cmnt=cmntObj.commentThreadRenderer.comment.commentRenderer.contentText.runs;
                var cmnt_text="";
                cmnt.forEach((c)=>cmnt_text+=(c.text+" "));
                cmnt_list.push(cmnt_text);
                // console.log(cmnt_text);
                // iter.continuationItems[i].commentThreadRenderer.comment.commentRenderer.contentText.runs=[{text:"Alter "}];
              });

              var prom= new Promise((resolve,reject)=>{
                chrome.runtime.sendMessage(editorExtensionId, {list_data: cmnt_list},
                    function(response_new) {
                      console.log("Ithaan this");
                      console.log(response_new);
                      iter.continuationItems.slice(0,-1).forEach((cmntObj,i)=>{
                        if(response_new.list_data[i]) iter.continuationItems[i].commentThreadRenderer.comment.commentRenderer.contentText.runs=[{text:"🔴🔴🔴"+ cmnt_list[i]}];
                      });
                      resolve(JSON.stringify(tmp_cmnts))
                    });
              }); 
            return prom;
        };

        response.text = text_dup;
    }
    return response;
};

