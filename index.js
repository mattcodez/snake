"use strict";
function init(/*TODO: place args here*/){
  new game(window, document, document.getElementById('playSpace'));
}

class game {
  //buildInitialPlayData
  //run render on requestanimationframe
  //update game state every 10ms
  //TODO: remember constants need to be in separate file, does that make sense here?

  constructor(window, document, playSpaceEl){
    this.stateUpdateSpeed = 100; //ms between game state changes
    this.snakeSpeed       = 300; //ms between snake movement /*TODO: move to snake stats*/
    this.state            = {};  //Holds game state for updates and rendering
    this.gridSize         = 50;

    //snake stats
    //TODO: consider separate class
    this.snake            = {};
    const snakeStart      = Math.floor(this.gridSize / 2);
    this.snake.pieces     = [
      [snakeStart, snakeStart, 0],
      [snakeStart, snakeStart - 1, 0]
    ];
    //this.snake.len        = 2;
    //this.snake.dir        = 1; //0: up, 1: right, 2: down, 3: left
    this.snake.lastMove   = 0; //unix time of last movement

    this.mainWindow       = window;
    this.mainHTMLDoc      = document;
    this.playSpaceEl      = playSpaceEl;

    this.assignEventHandlers();
    //this.buildInitialPlayData();
  }

  assignEventHandlers(){
    //game state and render
    this.mainWindow.setInterval(this.updateState.bind(this), this.stateUpdateSpeed);
    this.mainWindow.requestAnimationFrame(function runRender(timestamp){
      this.render();
      this.mainWindow.requestAnimationFrame(runRender.bind(this));
    }.bind(this));

    //controls
    //TODO
  }

  // buildInitialPlayData(){
  //   const grid = []
  //   this.state.grid = grid;
  // }

  updateState(){
    //TODO: add food
    //const [x, y] = this.snake.pos;
    const now = Date.now();
    if ((now - this.snake.lastMove) >= this.snakeSpeed){
      this.snake.lastMove = now;
      const newPieceSet = []; //let's keep things immutable
      let prevPiece = null;
      this.snake.pieces.forEach(piece => {
        const [x, y, dir] = piece;
        const [,,newDir] = prevPiece || [0,0,dir];
        switch(this.snake.dir){
          case 0: //up
            newPieceSet.unshift([x, y + 1, newDir]);
          break;
          case 1: //right
            newPieceSet.unshift([x + 1, y, newDir]);
          break;
          case 2: //down
            newPieceSet.unshift([x, y - 1, newDir]);
          break;
          case 3: //left
            newPieceSet.unshift([x - 1, y, newDir]);
          break;
        }
        prevPiece = piece;
      })
    }
  }

  render(){
    const {len, pos} = this.snake;
    const [x, y] = pos;
    const append = text => this.playSpaceEl.innerHTML += text;
    //Prepend to account for reverse Y axis
    const prepend = text => this.playSpaceEl.innerHTML = text + this.playSpaceEl.innerHTML;

    this.playSpaceEl.innerHTML = '';
    for (let row = 0; row < this.gridSize; row++){
      let rowText = '';
      for (let col = 0; col < this.gridSize; col++){
        switch(this.snake.dir){
          case 0: //up
            if (col === x && (row <= y && row >= (y - len))){
              rowText += '&#x2588;';
            }
            else rowText += '.';
          break;

          case 1: //right
            if (col === x && row === y){
              rowText += '&#x2588;';
            }
            else rowText += '.';
          break;

          case 2: //down
            if (col === x && (row <= y && row >= (y - len))){
              rowText += '&#x2588;';
            }
            else rowText += '.';
          break;

          case 3: //left
            if (col === x && (row <= y && row >= (y - len))){
              rowText += '&#x2588;';
            }
            else rowText += '.';
          break;
        }
      }
      rowText += '<br/>'; //end of grid row
      prepend(rowText);
    }
  }
}
