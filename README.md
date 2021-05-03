# Drag
<h2>Usage:</h2>
<p>Periodically triggers callback, that is supplied argument about dragging with mouse pressed, over an element.</p>
<h2>How to use:</h2>
<ol>
  <li>Import this file your js file</li>
  <li>Create Drag instance</li>
  <li>Call onDrag() on your instance, with callback as argument</li>
  <li>Call offDrag() on your instance to cancel</li>
</ol>

<h3>Notes:</h3>
<p>Doesn't work with elements, which outer width, doesn't match their width. (Don't use margin :]) Requires jQuery to work. Arguments fed to callback function are passed as arraz with x, y differences. When drag doesn't occur, or cursor is outside the element, null is passed.</p>

<h3>Code example:</h3>


```javascript
import Drag from "../ExtendedControls/Drag.js"

let dragTest = new Drag( $("#Element") );

//change drag callback interval to 200 mils
dragTest.checkInterval = 200;

//start drag listening
dragTest.onDrag( (drag) => {callback(drag)});


//stop drag listening
$("button").click( () => {
  dragTest.offDrag();
});


function callback(drag){
  if (!drag) {
    console.log("%cNo Dragging", "color:red;");
    return;
  }
  console.log(`Cursor Change: [%c${drag[0]},%c${drag[1]}]`, "color:blue;", "color:blue;");
}



```
![ezgif com-gif-maker](https://user-images.githubusercontent.com/59472129/116870432-db166980-ac12-11eb-88a2-51507c1ce63d.gif)






