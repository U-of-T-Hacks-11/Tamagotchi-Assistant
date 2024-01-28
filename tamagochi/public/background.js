/* Regex-pattern to check URLs against. 
   It matches URLs like: http[s]://[...]stackoverflow.com[...] */
var urlRegex = /^file:\/\/\/:?/

/* A function creator for callbacks */
function doStuffWithDOM(element) {
  alert('I received the following DOM content:\n' + element)
}

/* When the browser-action button is clicked... */
chrome.browserAction.onClicked.addListener(function (tab) {
  /*...check the URL of the active tab against our pattern and... */
  if (urlRegex.test(tab.url)) {
    /* ...if it matches, send a message specifying a callback too */
    chrome.tabs.sendMessage(tab.id, { text: 'report_back' }, doStuffWithDOM)
  }
})

chrome.runtime.onmessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension'
  )
  if (request.greeting === 'hello') sendResponse({ farewell: 'goodbye' })
})
