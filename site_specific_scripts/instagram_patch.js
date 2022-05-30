var openw = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
    var url=arguments[1];
    console.log(url);
    if(url.indexOf('timeline') !== -1){
        console.log(url);
        this.addEventListener('readystatechange', function(eve) {
          
          if(this.readyState==4 && eve.eve_source!='our'){
            Object.defineProperty(this, 'readyState', { writable: true });
            this.readyState=3;

            var tmp_posts=JSON.parse(this.responseText);
            var posts=[]
            tmp_posts.feed_items.forEach(element => posts.push(element.media_or_ad.caption.text));

            var editorExtensionId = "lfkbjcdkifaejoahhflfnojimgbplkgf";

            Object.defineProperty(this, 'responseText', {writable: true});
            Object.defineProperty(this, 'response', { writable: true });
            thisbro = this

            chrome.runtime.sendMessage(editorExtensionId, {list_data: posts},
            function(response) {

              // tmp_posts.feed_items.forEach((element,i) => {
              //   if (response.list_data[i]) element.media_or_ad.caption.text="🔴🔴🔴 "+posts[i];
              // });

              thisbro.responseText = thisbro.response= JSON.stringify(tmp_posts);
              thisbro.readyState=4;

              var neweve=new Event('readystatechange');
              neweve.eve_source='our'
              thisbro.dispatchEvent(neweve);
            });
          }
    },false); 
  }
  else if(url.indexOf('can_support_threading')!==-1){
    this.addEventListener('readystatechange', function(eve) {

      if(this.readyState==4 && eve.eve_source!='our'){
        var tmp_posts=JSON.parse(this.responseText);

        Object.defineProperty(this, 'readyState', { writable: true });
        Object.defineProperty(this, 'responseText', {writable: true});
        Object.defineProperty(this, 'response', {writable: true});
        this.readyState=3;

        this.response=this.responseText=null;
      

      var posts=[]
      posts.push(tmp_posts.caption.text);
      tmp_posts.comments.forEach(element => posts.push(element.text));

      thisbro=this;

      var editorExtensionId = "lfkbjcdkifaejoahhflfnojimgbplkgf";

        chrome.runtime.sendMessage(editorExtensionId, {list_data: posts},
        function(response) {
          console.log("hey");
          if(response.list_data[0]) tmp_posts.caption.text="🔴🔴🔴 "+posts[0];
          tmp_posts.comments.forEach((element,i) => {
            if (response.list_data[i+1]) tmp_posts.comments[i].text="🔴🔴🔴 "+posts[i+1];
          });
          
          thisbro.responseText = thisbro.response= JSON.stringify(tmp_posts);
              thisbro.readyState=4;


              var neweve=new Event('readystatechange');
              neweve.eve_source='our'
              thisbro.dispatchEvent(neweve);
        });
      }
},true); 
  }
return openw.apply(this,arguments);
};


    
