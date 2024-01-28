chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message')
  console.log(message)
  console.log(sender)
  sendResponse({ message: 'Message recieved' })
})

document.getElementById('save-btn').onclick = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  let result
  try {
    ;[{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => getSelection().toString(),
    })
  } catch (e) {
    return // ignoring an unsupported page like chrome://extensions
  }
  document.body.append('Selection: ' + result)
}

// document.getElementById('save-btn').onclick = async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   let result;
//   try {
//     [{ result }] = await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => getSelection().toString(),
//     });
//   } catch (e) {
//     return;
//   }

//   // Use the context to set the result
//   const { setSelection } = useContext(SelectionContext);
//   setSelection(result);

//   document.body.append('Selection: ' + result);
// };
