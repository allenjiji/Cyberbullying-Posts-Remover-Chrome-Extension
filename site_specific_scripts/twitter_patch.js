

var openw = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
    var url=arguments[1];
    if(url.indexOf('HomeTimeline') !== -1){
        console.log(url);
        this.addEventListener('readystatechange', function(eve) {

          if(this.readyState==4 && eve.eve_source!='our'){
            Object.defineProperty(this, 'readyState', { writable: true });
            this.readyState=3;

          var tmp_tweets=JSON.parse(this.responseText);
          // console.log(this.res)
          var tweets=[];
          tmp_tweets.data.home.home_timeline_urt.instructions[0].entries.forEach((element)=>{
            if (element.content.itemContent)  tweets.push(element.content.itemContent.tweet_results.result.legacy.full_text);
            else tweets.push("");
          });
          
          var editorExtensionId = "lfkbjcdkifaejoahhflfnojimgbplkgf";

          Object.defineProperty(this, 'responseText', {writable: true});
          Object.defineProperty(this, 'response', { writable: true });
          thisbro = this

          chrome.runtime.sendMessage(editorExtensionId, {list_data: tweets},
            function(response) {
              console.log("Ithaan this");
              console.log(response);

              tmp_tweets.data.home.home_timeline_urt.instructions[0].entries.forEach((element,i)=>{
                if (response.list_data[i])  element.content.itemContent.tweet_results.result.legacy.full_text="🔴🔴🔴 "+element.content.itemContent.tweet_results.result.legacy.full_text;
              });
              
              thisbro.responseText = thisbro.response= JSON.stringify(tmp_tweets);
              thisbro.readyState=4;

              console.log(thisbro.responseText)

              var neweve=new Event('readystatechange');
              neweve.eve_source='our'
              thisbro.dispatchEvent(neweve);
            });
          }
    },false); 
  }
  else if(url.indexOf('UserTweets') !== -1){
    console.log(url);
        this.addEventListener('readystatechange', function(eve) {

          if(this.readyState==4 && eve.eve_source!='our'){
            Object.defineProperty(this, 'readyState', { writable: true });
            this.readyState=3;

          var tmp_tweets=JSON.parse(this.responseText);
          // console.log(this.res)
          var tweets=[];
          tmp_tweets.data.user.result.timeline_v2.timeline.instructions[1].entries.forEach((element)=>{
            if (element.content.itemContent!=undefined) tweets.push(element.content.itemContent.tweet_results.result.legacy.full_text);
            else {
              console.log(element.content);
              tweets.push("");}
          });
          
          var editorExtensionId = "lfkbjcdkifaejoahhflfnojimgbplkgf";

          Object.defineProperty(this, 'responseText', {writable: true});
          Object.defineProperty(this, 'response', { writable: true });
          thisbro = this

          chrome.runtime.sendMessage(editorExtensionId, {list_data: tweets},
            function(response) {
              console.log("Ithaan this");
              console.log(response);

              tmp_tweets.data.user.result.timeline_v2.timeline.instructions[1].entries.forEach((element,i)=>{
                if (response.list_data[i])  element.content.itemContent.tweet_results.result.legacy.full_text="🔴🔴🔴 "+element.content.itemContent.tweet_results.result.legacy.full_text;
              });

              thisbro.responseText = thisbro.response= JSON.stringify(tmp_tweets);
              thisbro.readyState=4;

              console.log(thisbro.responseText)

              var neweve=new Event('readystatechange');
              neweve.eve_source='our'
              thisbro.dispatchEvent(neweve);
            });
          }
    },false); 
  }
  else if(url.indexOf('TweetDetail') !== -1){
    console.log(url);
        this.addEventListener('readystatechange', function(eve) {

          if(this.readyState==4 && eve.eve_source!='our'){
            Object.defineProperty(this, 'readyState', { writable: true });
            this.readyState=3;

          var tmp_tweets=JSON.parse(this.responseText);
          // console.log(this.res)
          var tweets=[];
          tmp_tweets.data.threaded_conversation_with_injections_v2.instructions[0].entries.forEach((element)=>{
            if (element.entryId.indexOf('tweet-')!==-1) tweets.push(element.content.itemContent.tweet_results.result.legacy.full_text);
            else if(element.entryId.indexOf('conversationthread')!==-1){
              element.content.items.forEach((e)=>tweets.push(e.item.itemContent.tweet_results.result.legacy.full_text))
            } 
            else tweets.push("");
          });
          
          var editorExtensionId = "lfkbjcdkifaejoahhflfnojimgbplkgf";

          Object.defineProperty(this, 'responseText', {writable: true});
          Object.defineProperty(this, 'response', { writable: true });
          thisbro = this

          chrome.runtime.sendMessage(editorExtensionId, {list_data: tweets},
            function(response) {
              console.log("Ithaan this");
              console.log(response);


              var gc=0;
              tmp_tweets.data.threaded_conversation_with_injections_v2.instructions[0].entries.forEach((element)=>{
                if (element.entryId.indexOf('tweet')!==-1){
                  if(response.list_data[gc]) element.content.itemContent.tweet_results.result.legacy.full_text="🔴🔴🔴 "+element.content.itemContent.tweet_results.result.legacy.full_text;
                  gc++;
                }
                else if(element.entryId.indexOf('conversationthread')!==-1){
                  element.content.items.forEach((e)=>{
                    if(response.list_data[gc]) e.item.itemContent.tweet_results.result.legacy.full_text="🔴🔴🔴 "+e.item.itemContent.tweet_results.result.legacy.full_text;
                    gc++;
                  });
                } 
                else{
                  tweets.push("");
                  gc++;
                }
              });

              thisbro.responseText = thisbro.response= JSON.stringify(tmp_tweets);
              thisbro.readyState=4;

              console.log(thisbro.responseText)

              var neweve=new Event('readystatechange');
              neweve.eve_source='our'
              thisbro.dispatchEvent(neweve);
            });
          }
    },false); 
  }
  else if(url.indexOf('adaptive.json') !== -1){
    console.log(url);
    this.addEventListener('readystatechange', function(eve) {

      if(this.readyState==4 && eve.eve_source!='our'){
        Object.defineProperty(this, 'readyState', { writable: true });
        this.readyState=3;

      var tmp_tweets=JSON.parse(this.responseText);
      // console.log(this.res)
      var tweets=[];
      Object.keys(tmp_tweets.globalObjects.tweets).forEach((key)=>{
        tweets.push(tmp_tweets.globalObjects.tweets[key].full_text);
      });
      
      var editorExtensionId = "lfkbjcdkifaejoahhflfnojimgbplkgf";

      Object.defineProperty(this, 'responseText', {writable: true});
      Object.defineProperty(this, 'response', { writable: true });
      thisbro = this

      chrome.runtime.sendMessage(editorExtensionId, {list_data: tweets},
        function(response) {
          console.log("Ithaan this");
          console.log(response);

          Object.keys(tmp_tweets.globalObjects.tweets).forEach((key,i)=>{
            if (response.list_data[i]) tmp_tweets.globalObjects.tweets[key].full_text="🔴🔴🔴 "+tmp_tweets.globalObjects.tweets[key].full_text;
          });
          
          thisbro.responseText = thisbro.response= JSON.stringify(tmp_tweets);
          thisbro.readyState=4;

          console.log(thisbro.responseText)

          var neweve=new Event('readystatechange');
          neweve.eve_source='our'
          thisbro.dispatchEvent(neweve);
        });
      }
},false); 
}
return openw.apply(this,arguments);
};


// home.json,usertweets,tweetdetails,bookmarks

