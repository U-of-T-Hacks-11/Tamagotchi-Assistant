// /* Listen for messages */
// chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
//     /* If the received message has the expected format... */
//     if (msg.text && (msg.text == "report_back")) {
//         /* Call the specified callback, passing
//            the web-pages DOM content as argument */
//     sendResponse(document.getElementById("mybutton").innerHTML);
//     }
// });


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    let result;
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
          return {
            result: getSelection().toString(),
          };
        },
      });
      result = response[0].result;
    } catch (e) {
      console.error(e);
    }
    sendResponse({ message: result });
  });