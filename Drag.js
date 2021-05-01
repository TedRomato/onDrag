
export default class Drag{
  constructor(element){
    this.element = element;

    this.mousePosition = [0,0];
    this.mouseDown = false;
    this.positionDifference = [0,0];

    this.callback = undefined;

    this.handleCalllback = () => {
      this.callback(this.positionDifference);
    }

    this.handleWindowMouseMove = ( ) => {
      if(!this.cursorInElement){
        this.mousePosition = [null, null]
        this.mouseDown = false;

      }
      this.cursorInElement = false;
    }

    this.handleMouseMove = ( e, callback ) => {
      this.cursorInElement = true;

      if(this.mouseDown){

        let xDifference = this.mousePosition[0] - event.pageX;
        let yDifference = this.mousePosition[1] - event.pageY;
        this.positionDifference = [xDifference,yDifference];
        this.handleCalllback();

      }

      const positionX = this.element.position().left;
      const positionY = this.element.position().top;
      this.mousePosition = [e.pageX - positionX, e.pageY - positionY]

    }

    this.handleMouseDown = ( ) => {
      console.log("Pressed");
      this.mouseDown = true;
    }

    this.handleMouseUp = ( ) => {
      this.mouseDown = false;
      console.log("Released");
    }

  }

  onDrag( callback ){

    this.callback = callback;

    $( window ).on('mousemove',this.handleWindowMouseMove);

    $( this.element ).on('mousemove', this.handleMouseMove);

    $( this.element ).on('mousedown', this.handleMouseDown);

    $( this.element ).on('mouseup',  this.handleMouseUp);

  }

  offDrag(){

    $( this.element ).off('mousemove', this.handleMouseMove);

    $( this.element ).off('mousedown', this.handleMouseDown);

    $( this.element ).off('mouseup', this.handleMouseUp);

  }
}
