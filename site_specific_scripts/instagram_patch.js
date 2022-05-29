var openw = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function() {
    var url=arguments[1];
    console.log(url);
    if(url.indexOf('timeline') !== -1){
        console.log(url);
        this.addEventListener('load', function(event) {
            var tmp_posts=JSON.parse(this.responseText);
            tmp_posts.feed_items.forEach(element => element.media_or_ad.caption.text="Myre Moonji");
            Object.defineProperty(this, 'responseText', {writable: true});
            this.responseText=JSON.stringify(tmp_posts);
            Object.defineProperty(this, 'responseText', {writable: false});
    },false); 
  }
return openw.apply(this,arguments);
};


    
