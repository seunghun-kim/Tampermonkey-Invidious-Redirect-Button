// ==UserScript==
// @name         Invidious Redirect Button
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Adds a button to redirect from YouTube to a self-hosted Invidious instance.
// @match        *://*.youtube.com/*
// @grant        none
// @author       Seunghun Kim
// @icon         https://youtube.com/favicon.ico
// ==/UserScript==

// Please modify the following URL to point to your own Invidious instance
const INVIDIOUS_URL = "http://your-invidious-instance/";

function invidio_url() {
  const this_url = window.location.href;
  const index_of_watch = this_url.indexOf("watch");
  let watch_spec = this_url.slice(index_of_watch);
  const index_of_ampersand = watch_spec.indexOf("&");
  if (-1 < index_of_ampersand)
    watch_spec = watch_spec.slice(0, index_of_ampersand);
  return INVIDIOUS_URL + watch_spec;
}

function createButton() {
  const element = document.createElement("button");
  element.innerHTML = "To Invidious";
  element.style.position = "fixed";
  element.style.background = "linear-gradient(90deg, #ff4d4d, #ff6666)";
  element.style.color = "#ffffff";
  element.style.padding = "8px 16px";
  element.style.border = "none";
  element.style.borderRadius = "12px";
  element.style.fontSize = "14px";
  element.style.fontWeight = "500";
  element.style.cursor = "pointer";
  element.style.zIndex = "99999";
  element.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
  element.style.transition = "transform 0.2s, background 0.2s";
  element.style.transform = "translateY(0)";

  // Hover effect
  element.addEventListener("mouseover", () => {
    element.style.background = "linear-gradient(90deg, #ff3333, #ff4d4d)";
    element.style.transform = "translateY(-2px)";
  });
  element.addEventListener("mouseout", () => {
    element.style.background = "linear-gradient(90deg, #ff4d4d, #ff6666)";
    element.style.transform = "translateY(0)";
  });

  element.onclick = () => {
    window.location = invidio_url();
  };

  return element;
}

function positionButton() {
  const button = createButton();
  const logoContainer = document.querySelector("#logo");
  if (logoContainer) {
    const rect = logoContainer.getBoundingClientRect();
    button.style.left = `${rect.right + 10}px`;
    button.style.top = `${rect.top + (rect.height - button.offsetHeight) / 2}px`;
    document.body.appendChild(button);
    return button;
  }
  return null;
}

let button = null;

// Initial positioning
function initializeButton() {
  if (button) {
    document.body.removeChild(button);
  }
  button = positionButton();
}

// Handle fullscreen changes
document.onfullscreenchange = function (event) {
  if (document.fullscreenElement) {
    if (button && button.parentNode) {
      document.body.removeChild(button);
    }
  } else {
    if (!button) {
      button = positionButton();
    } else if (!button.parentNode) {
      document.body.appendChild(button);
    }
  }
};

// MutationObserver to handle dynamic page changes
const observer = new MutationObserver(() => {
  if (!button || !button.parentNode) {
    initializeButton();
  } else {
    const logoContainer = document.querySelector("#logo");
    if (logoContainer) {
      const rect = logoContainer.getBoundingClientRect();
      button.style.left = `${rect.right + 10}px`;
      button.style.top = `${rect.top + (rect.height - button.offsetHeight) / 2}px`;
    }
  }
});

// Observe changes in the body
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Initial button creation
initializeButton();
