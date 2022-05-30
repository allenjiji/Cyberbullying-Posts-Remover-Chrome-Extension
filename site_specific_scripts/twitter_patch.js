

var openw = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
    var url=arguments[1];
    if(url.indexOf('HomeTimeline') !== -1){
        console.log(url);
        this.addEventListener('readystatechange', function(event) {
          var tmp_tweets=JSON.parse(this.responseText);
          console.log(this.res)
          // var tweets=[];
          // Object.keys(tmp_tweets.globalObjects.tweets).forEach((key)=>{
          //   tweets.push(tmp_tweets.globalObjects.tweets[key]["full_text"]);
          //   tmp_tweets.globalObjects.tweets[key]["full_text"]="Hello";
          // });
          const prediction_url="https://mocki.io/v1/54aac1dd-e447-4543-95b5-2c7098a09e12";
          fetch(prediction_url).then(data=>data.json()).then(res=>console.log(res));          
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

