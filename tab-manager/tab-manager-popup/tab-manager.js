/**
 * CSS to hide everything on the page,
 * except for elements that have the "add-category-image" class.
 */
const hidePage = `body > :not(.add-category-image) {
                    display: none;
                  }`;


/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    function addCategory(color) {
      getCurrentWindowTabs().then((tabs) => {
        for (let tab of tabs) {
          if (tab.active) {
            //console.log("La url es: " + tab.url);
            console.log("// color -> " + color + " // url -> " + tab.url);

            switch (color) {
              case "red":
                browser.tabs.removeCSS({ code: "body { border: 20px dashed red; }" });
                browser.tabs.insertCSS({ code: "body { border: 20px dashed red; }" });
                break;
              case "green":
                browser.tabs.removeCSS({ code: "body { border: 20px dashed green; }" });
                browser.tabs.insertCSS({ code: "body { border: 20px dashed green; }" });
                break;
              case "yellow":
                browser.tabs.removeCSS({ code: "body { border: 20px dashed yellow; }" });
                browser.tabs.insertCSS({ code: "body { border: 20px dashed yellow; }" });
                break;
            }
          }
        }
      });
    }


    function setCategoryColor(color) {
      addCategory(color);
      // console.log("The color is: " + color);
    }

    function getCurrentWindowTabs() {
      return browser.tabs.query({ currentWindow: true });
    }

    function reportError(error) {
      console.error(`Could not add-category: ${error}`);
    }

    /**
     * Get the active tab 
     */
    if (e.target.classList.contains("new-category")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(addCategory)
        .catch(reportError);
    }
    if (e.target.classList.contains("red-color")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(setCategoryColor("red"))
        .catch(reportError);
    }
    if (e.target.classList.contains("green-color")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(setCategoryColor("green"))
        .catch(reportError);
    }
    if (e.target.classList.contains("yellow-color")) {
      browser.tabs.query({ active: true, currentWindow: true })
        .then(setCategoryColor("yellow"))
        .catch(reportError);
    }


  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute add-category content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({ file: "/content_scripts/tab-manager.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);


