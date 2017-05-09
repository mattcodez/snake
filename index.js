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
    this.stateUpdateSpeed   = 10;  //ms between game state changes
    this.snakeSpeed    = 4;   //How many state updates between snake movement
    this.state         = {};  //Holds game state for updates and rendering

    this.mainWindow    = window;
    this.mainHTMLDoc   = document;
    this.playSpaceEl   = playSpaceEl;

    this.assignEventHandlers();
    this.buildInitialPlayData();
  }

  assignEventHandlers(){
    //game state and render
    this.window.requestanimationframe(this.render);
    this.window.setInterval(this.updateState, this.stateUpdateSpeed);

    //controls
  }

  buildInitialPlayData(){
    this.playSpaceEl
  }

  render(timestamp)
}
