var isFullscreen = false;
var popover = undefined;

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

    var bodyEl = document.querySelectorAll("body")[0];

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

function hijackButtons() {
  var urls = document.querySelectorAll("div.url a");
  for(i in urls) {
    console.log(urls[i]);
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

function showPopover(url) {
  console.log("TADA!");
  // http://stackoverflow.com/questions/9515704/building-a-chrome-extension-inject-code-in-a-page-using-a-content-script
  // Create iFrame
  // Resize iFrame
  // Append iFrame
};

function clearPopover() {
  // Remove iFrame
  // Clear iFrame storage
};
