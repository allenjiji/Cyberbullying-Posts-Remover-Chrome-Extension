
var sendw = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function() {
    var payload=arguments[0];
    console.log(typeof(payload));
    if(payload && payload.indexOf('CometNewsFeedPaginationQuery') !== -1){
        // console.log('Our graphql');
        this.addEventListener('load', function(event) {
        console.log(this.responseText);
        console.log(this.responseText.split('} {').length-1);
        console.log("Hello");
    },false); 
  }
return sendw.apply(this,arguments);
};


// home.json,usertweets,tweetdetails,bookmarks

