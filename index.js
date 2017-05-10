"use strict";
function init(/*TODO: place args here*/){
  new game(window, document, document.getElementById('playSpace'));
}

class game {
  constructor(window, document, playSpaceEl){
    this.stateUpdateSpeed = 100; //ms between game state changes
    this.snakeSpeed       = 300; //ms between snake movement /*TODO: move to snake stats*/
    this.state            = {};  //Holds game state for updates and rendering
    this.gridSize         = 50;  //Size of characters in grid

    //snake stats
    //TODO: consider separate class
    this.snake            = {};
    const snakeStart      = Math.floor(this.gridSize / 2);
    this.snake.pieces     = [
      [snakeStart, snakeStart, 0],
      [snakeStart, snakeStart - 1, 0],
      [snakeStart, snakeStart - 2, 0]
    ];
    this.snake.lastMove   = 0; //unix time of last movement

    this.mainWindow       = window;
    this.mainHTMLDoc      = document;
    this.playSpaceEl      = playSpaceEl;

    this.assignEventHandlers();
  }

  assignEventHandlers(){
    //game state and render
    this.mainWindow.setInterval(this.updateState.bind(this), this.stateUpdateSpeed);
    this.mainWindow.requestAnimationFrame(function runRender(timestamp){
      this.render();
      this.mainWindow.requestAnimationFrame(runRender.bind(this));
    }.bind(this));

    //controls
    this.mainHTMLDoc.onkeydown = e => {
      switch(e.keyCode){
        case 37: //left
          this.setNewDir(3); //console.log('left')
        break;
        case 38: //up
          this.setNewDir(0); //console.log('up')
        break;
        case 39: //right
          this.setNewDir(1); //console.log('right')
        break;
        case 40: //down
          this.setNewDir(2); //console.log('down')
        break;
      }
    };
  }

  setNewDir(newDir){
    this.snake.pieces[0][2] = newDir;
  }

  updateState(){
    //TODO: add food
    const now = Date.now();
    if ((now - this.snake.lastMove) >= this.snakeSpeed){
      this.snake.lastMove = now;
      const newPieceSet = []; //let's keep things immutable
      let nextDir;
      this.snake.pieces.forEach((piece,i) => {
        const [x, y, dir] = piece;
        //The piece will move next time in the direction of the previous piece
        nextDir = nextDir || dir;
        //console.log(`piece:${i},dir:${dir},nextDir:${nextDir}`);
        switch(dir){
          case 0: //up
            newPieceSet.push([x, y + 1, nextDir]);
          break;
          case 1: //right
            newPieceSet.push([x + 1, y, nextDir]);
          break;
          case 2: //down
            newPieceSet.push([x, y - 1, nextDir]);
          break;
          case 3: //left
            newPieceSet.push([x - 1, y, nextDir]);
          break;
        }
        nextDir = dir;
      });
      this.snake.pieces = newPieceSet;
    }
  }

  render(){
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
