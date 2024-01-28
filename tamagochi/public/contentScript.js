// contentScript.js
// const div = document.createElement('div');
// div.innerText = 'Hello from your Chrome extension!';
// document.body.appendChild(div);

function getText(){
    return document.body.innerText
}
function getHTML(){
    return document.body.outerHTML
}
console.log(getText());             //Gives you all the text on the page
console.log(getHTML());             //Gives you the whole HTML of the page