

var openw = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
    var url=arguments[1];
    if(url.indexOf('HomeTimeline') !== -1){
        console.log(url);
        this.addEventListener('load', function(event) {
          var tmp_tweets=JSON.parse(this.responseText);
          // console.log(this.res)
          var tweets=[];
          tmp_tweets.data.home.home_timeline_urt.instructions[0].entries.forEach((element)=>{
            if (element.content.itemContent)  tweets.push(element.content.itemContent.tweet_results.result.legacy.full_text);
            else tweets.push("");
            // tmp_tweets.globalObjects.tweets[key]["full_text"]="Hello";
          });
          

          var editorExtensionId = "lfkbjcdkifaejoahhflfnojimgbplkgf";

          // Make a simple request:
          chrome.runtime.sendMessage(editorExtensionId, {list_data: tweets},
            function(response) {
              console.log('Bra,Bra\n\n')
              console.log(response);
            });



          console.log("Hello");
          Object.defineProperty(this, 'responseText', {writable: true});
          this.responseText=JSON.stringify(tmp_tweets);
          console.log(this.responseText);
          Object.defineProperty(this, 'responseText', {writable: false});
    },false); 
  }
return openw.apply(this,arguments);
};


// home.json,usertweets,tweetdetails,bookmarks

