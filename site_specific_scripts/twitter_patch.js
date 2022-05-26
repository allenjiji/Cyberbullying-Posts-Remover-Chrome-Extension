var openw = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function () {
    var url = arguments[1];
    if (url.indexOf('home.json') !== -1) {
        console.log(url);
        this.addEventListener('readystatechange', function (event) {
            var tmp_tweets = JSON.parse(this.responseText);
            Object.keys(tmp_tweets.globalObjects.tweets).forEach((key) => tmp_tweets.globalObjects.tweets[key]["full_text"] = "Altered Text");
            // var keys=Object.keys(tmp_tweets.globalObjects.tweets);
            // tmp_tweets.globalObjects.tweets[keys[0]]="Shit has wreaked Havoc";
            Object.defineProperty(this, 'responseText', { writable: true });
            this.responseText = JSON.stringify(tmp_tweets);
            console.log(this.responseText);
            Object.defineProperty(this, 'responseText', { writable: false });
        }, false);
    }
    return openw.apply(this, arguments);
};



