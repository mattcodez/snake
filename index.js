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
        switch(dir){
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
      });
      this.snake.pieces = newPieceSet;
    }
  }

  render(){
    const append = text => this.playSpaceEl.innerHTML += text;
    //Prepend to account for reverse Y axis
    const prepend = text => this.playSpaceEl.innerHTML = text + this.playSpaceEl.innerHTML;

    //Blank fill
    const grid = [];
    for (let i = 0; i < this.gridSize; i++){
      grid.push(Array(this.gridSize).fill('.'));
    }

    //Set snake pieces in grid
    this.snake.pieces.forEach(piece => {
      const [x, y] = piece;
      grid[y][x] = '&#x2588;';
    });

    //do this all separate, otherwise we'd have to check every piece for
    //every cell
    this.playSpaceEl.innerHTML = '';
    grid.forEach(row => prepend(row.join('') + '<br/>'));
  }
}
