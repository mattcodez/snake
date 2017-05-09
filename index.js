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
    this.stateUpdateSpeed = 10;  //ms between game state changes
    this.snakeSpeed       = 4;   //How many state updates between snake movement /*TODO: move to snake stats*/
    this.state            = {};  //Holds game state for updates and rendering
    this.gridSize         = 100;

    //snake stats
    //TODO: consider separate class
    this.snake            = {};
    const snakeStart      = Math.floor(this.gridSize / 2);
    this.snake.pos        = [snakeStart, snakeStart];
    this.snake.len        = 2;
    this.snake.dir        = 0; //0: up, 1: right, 2: down, 3: left

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
    const [x, y] = this.snake.pos;
    //this.snake.pos = [x, y + 1];
  }

  render(){
    const {len, pos} = this.snake;
    const [x, y] = pos;
    function append(text){
      this.playSpaceEl.innerHTML += text;
    }

    this.playSpaceEl.innerHTML = '';
    for (let row = 0; row < this.gridSize; row++){
      for (let col = 0; col < this.gridSize; col++){
        switch(this.snake.dir){
          case 0: //up
            if (col === x && (row <= y && row >= (y - len))){
              append('S');
            }
            else append('0');
          break;
          case 1: //right
          break;
          case 2: //down
          break;
          case 3: //left
          break;
        }
      }
      this.playSpaceEl.innerHTML += '<br/>'; //end of grid row
    }
  }
}
