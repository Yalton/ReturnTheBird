// Create a callback function to execute when mutations are observed
var callback = function(mutationsList, observer) {
    for(var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            var logo = document.querySelector('div > h1 > a > div > svg');
            if (logo) {
                // get size of the svg
                var rect = logo.getBoundingClientRect();
                
                logo.outerHTML = '<img src="' + chrome.runtime.getURL("images/Twitter-Old-Logo.png") + '" alt="Old Logo" style="height: ' + rect.height + 'px; width: ' + rect.height + 'px;">';
                observer.disconnect();
                break;
            }
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the document with the configured parameters
observer.observe(document, { childList: true, subtree: true });

// Changing favicon when document is fully loaded
window.onload = function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = chrome.runtime.getURL("images/favicon.ico");
    console.log("Setting favicon to ", link.href);
    document.getElementsByTagName('head')[0].appendChild(link);
}
