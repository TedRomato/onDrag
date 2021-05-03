export default class CursorToBorderProximity{
  constructor(element, checkInterval_ms = 100){
    this.element = element;
    this.mousePosition = [0,0];
    this.checkInterval = checkInterval_ms;
    this.mousePressed = false;
    this.mouseStateChanged = false;
    this.callback = undefined;
    this.dragMousePositionStart = undefined;
    this.cursorInElement = undefined;
    this.running = true;

    this.handleElementMouseMove = ( e ) => {
      this.cursorInElement = true;
      const positionX = this.element.position().left;
      const positionY = this.element.position().top;
      this.mousePosition = [e.pageX - positionX, e.pageY - positionY]
    }

    this.handleWindowMouseMove = ( ) => {
      if(!this.cursorInElement){
        this.mousePosition = [null, null];
        this.mousePressed = false;
      }
      this.cursorInElement = false;
    }

    this.handleMouseDown = ( ) => {
      this.mousePressed = true;
      this.mouseStateChanged = true;
    }

    this.handleMouseUp = ( ) => {
      this.mouseStateChanged = true;
      this.mousePressed = false;
    }

  }

  onDrag(callback){
    this.callback = callback;
    this.running = true;

    //If mouse move didnt happen on element this global mouse move
    //cursor is outside the element
    //so we set mouse position to null, not to trigger border proximity

    $( window ).on('mousemove',this.handleWindowMouseMove);
    $( this.element ).on('mousemove', this.handleElementMouseMove);
    $( this.element ).on('mousedown', this.handleMouseDown);
    $( this.element ).on('mouseup', this.handleMouseUp);

    this.listen();
  }


  offDrag(){
    $( this.element ).off('mousemove', this.handleWindowMouseMove);
    $( this.element ).off('mousemove', this.handleElementMouseMove);

    this.running = false;
  }


  async listen(){
    this.mouseStateChanged = false;
    this.dragMousePositionStart = [this.mousePosition[0], this.mousePosition[1]];
    console.log(this.mousePressed);
    setTimeout(() => {
      this.callback(this.getCallbackArgument());
      if(this.running){
        this.listen();
      }
    },this.checkInterval);

  }

  getCallbackArgument(){
    if(this.mouseStateChanged) return null
    if(!this.mousePressed) return null
    return this.getMousePositionDifference();
  }

  getMousePositionDifference(){
    if (!this.mousePosition[0] || !this.mousePosition[1]) return null;

    return [this.mousePosition[0] - this.dragMousePositionStart[0], this.mousePosition[1] - this.dragMousePositionStart[1]];

  }
}

