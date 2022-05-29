const { fetch: originalFetch } = window;


window.fetch = async (...args) => {
    let [resource, config ] = args;

    var url=resource.url;
    // console.log(url);
    var response = await originalFetch(resource, config);

    if(url.indexOf('next?key') !== -1){
        console.log(url);

        const text_dup =async () =>{
            console.log("I reached Json");
            var tmp_cmnts=await response.clone().json();
            if('onResponseReceivedEndpoints' in tmp_cmnts){
                tmp_cmnts.onResponseReceivedEndpoints[1].reloadContinuationItemsCommand.continuationItems.slice(0,-1).forEach((cmntObj,i)=>{
                cmnt=cmntObj.commentThreadRenderer.comment.commentRenderer.contentText.runs;
                // cmnt_text="";
                // cmnt.forEach((c)=>cmnt_text+=(c.text+" "));
                tmp_cmnts.onResponseReceivedEndpoints[1].reloadContinuationItemsCommand.continuationItems[i].commentThreadRenderer.comment.commentRenderer.contentText.runs=[{text:"Myre Moonji"}];
              });
            }
            return JSON.stringify(tmp_cmnts);
        };

        response.text = text_dup;
    }
    return response;
};


    
