var isFullscreen = false;

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
	}
	}, 10);
});
