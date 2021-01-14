(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  // function insertBeast(beastURL) {
  //   removeExistingBeasts();
  //   let beastImage = document.createElement("img");
  //   beastImage.setAttribute("src", beastURL);
  //   beastImage.style.height = "100vh";
  //   beastImage.className = "add-category-image";
  //   document.body.appendChild(beastImage);
  // }

  // /**
  //  * Remove every beast from the page.
  //  */
  // function removeExistingBeasts() {
  //   let existingBeasts = document.querySelectorAll(".add-category-image");
  //   for (let beast of existingBeasts) {
  //     beast.remove();
  //   }
  // }

  /**
   * Listen for messages from the background script.
   * Call "add-category()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    console.log(message);
    // if (message.command === "addCategory") {
    //   addNewCategory();
    // } 
    // if (message.command === "setColor") {
    //   setCategoryColor(message.color);
    // } 
  });


  
/**
 * tab-manager adds
 */

function addNewCategory(){
  console.log('Adding a new category');
}

function setCategoryColor(color){
  console.log('Setting color ' + color);
}


})();
