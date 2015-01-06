var _pageOverlay = undefined;

var _shade = document.createElement("div");
_shade.classList.add("shade");

var _close = document.createElement("a");
_close.classList.add("close-popover");
_close.textContent = "x";
_close.setAttribute("onclick", "clearPopover(); return false;");

function showPopover(url) {
  _pageOverlay = document.createElement("iframe");
  _pageOverlay.setAttribute("src", url);
  _pageOverlay.classList.add("popover");

  document.body.appendChild(_shade);
  document.body.appendChild(_pageOverlay);
  document.body.appendChild(_close);
  return false;
};

function clearPopover() {
  document.body.removeChild(_shade);
  document.body.removeChild(_pageOverlay);
  document.body.removeChild(_close);

  _pageOverlay = undefined;
  return false;
};
