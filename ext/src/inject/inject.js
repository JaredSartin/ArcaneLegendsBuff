var isFullscreen = false;
var popover = undefined;

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

    var bodyEl = document.querySelectorAll("body")[0];

    //////////////////////////////////////////
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('src/js/embed.js');
    s.onload = function() { this.parentNode.removeChild(this); };
    (document.head||document.documentElement).appendChild(s);
    /////////////////////////////////////////

    bodyEl.classList.add("debuffed-game");

    var resizeButton = document.createElement("div");
    resizeButton.id = "resize-button";
    resizeButton.onclick = function() {
      isFullscreen = !isFullscreen;
      bodyEl.classList.toggle("debuffed-game");
      bodyEl.classList.toggle("buffed-game");
      if(isFullscreen) {
        bodyEl.webkitRequestFullScreen.call(bodyEl);
        resizeButtonImg.src = chrome.extension.getURL("src/images/fullscreen-exit.png");
      } else {
        document.webkitExitFullscreen();
        resizeButtonImg.src = chrome.extension.getURL("src/images/fullscreen.png");
      }
    };

    // var resizeButtonImg = document.createElement("img");
    var resizeButtonImg = new Image();
    resizeButtonImg.src = chrome.extension.getURL("src/images/fullscreen.png");

    resizeButton.appendChild(resizeButtonImg);
    bodyEl.appendChild(resizeButton);

    listener.addEventListener("DOMSubtreeModified", hijackButtons)
	}
	}, 10);
});

// Setup for embeded script usage
function hijackButtons() {
  var urls = document.querySelectorAll("div.url a");
  for(i in urls) {
    if(urls[i].getAttribute) {
      var href = urls[i].getAttribute("href");
      var onclick = urls[i].getAttribute("onclick");
      // var rel = urls[i].getAttribute("rel");

      if(!!href && !onclick) {
        urls[i].setAttribute("onclick", "showPopover('" + href + "'); return false;");
      } else if(!href && !!onclick) {
        // HIJACK!
      }
    }
  };
}

