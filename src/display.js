// experimentation...


const boardDisplay = (player, cpu, pGameboard, cpuGameboard) =>{
  const playerBoard = document.querySelector('.playerGameboard');
  const cpuBoard = document.querySelector('.cpuGameboard');
  
  for(let i=0; i<10;i++){
    for(let j=0;j<10;j++){
      const cellPlayer = document.createElement('div');
      const cellCPU = document.createElement('div');
      cellPlayer.classList.add('playerCell');
      cellPlayer.dataset.y = i;
      cellPlayer.dataset.x = j;
      cellCPU.classList.add('cpuCell');
      cellCPU.dataset.y = i;
      cellCPU.dataset.x = j;


      // adds event listeners on the cpu's board so things happen when i click on it.
      cellCPU.addEventListener('click', (event)=>{
        const xValue = +event.target.dataset.x;
        const yValue = +event.target.dataset.y;
        const attackResult = player.playerAttack(xValue, yValue);

        if(pGameboard.getAllSunk()){
          return;
        }

        if(cpuGameboard.getAllSunk()){
          return;
        }

        if(attackResult === 'hit'){
          event.target.classList.add('hit');
        }

        if(attackResult === 'a miss'){
          event.target.classList.add('miss');
        }

        if(attackResult === 'ship has sunk!'){
          event.target.classList.add('hit');
        }

        if(attackResult === 'was hit already'){
          return;
        }

        if(cpuGameboard.checkAllShipsSunk() === true){
          const playerWonAnnouncement = document.querySelector('.victoryBanner2');
          playerWonAnnouncement.style.display = 'flex';
          return 'player won';
        }

        // cpu turn, the random coordinates will be used to change display.
        const cpuAttackResult = cpu.cpuAttack();
        const stringifyRandX = cpuAttackResult[0].toString();
        const stringifyRandY = cpuAttackResult[1].toString();
        const currentRandCoordinates = document.querySelector(`[data-x="${stringifyRandX}"][data-y="${stringifyRandY}"]`);


        if(cpuAttackResult[2] === 'hit'){
          currentRandCoordinates.classList.remove('playerShip');
          currentRandCoordinates.classList.add('hit');
        }

        if(cpuAttackResult[2] === 'a miss'){
          currentRandCoordinates.classList.add('miss');
        }

        if(cpuAttackResult[2] === 'ship has sunk!'){
          currentRandCoordinates.classList.add('hit');
        }

        if(pGameboard.checkAllShipsSunk() === true){
          const playerWonAnnouncement = document.querySelector('.victoryBanner1');
          playerWonAnnouncement.style.display = 'flex';
          return 'cpu won';
        }


      });

      playerBoard.append(cellPlayer);
      cpuBoard.append(cellCPU);
    }    
  }

};

// displays ships on player's board.
const markShips = (gameboard) => {
// shows deployed ships on player's board.
  for(let i = 0; i < gameboard.shipPlacementTracker.length; i++){
    const coordinatesArray = gameboard.shipPlacementTracker[i].split(',');
    const shipXValue = coordinatesArray[0].trim();
    const shipYValue = coordinatesArray[1].trim();
    const correspondingShipElement = document.querySelector(`[data-x="${shipXValue}"][data-y="${shipYValue}"]`);
    correspondingShipElement.classList.add('playerShip');
  }

};


const interactivePlacement = (playerBoard, cpuBoard, counter, isShipPlacementFinished) => {

  const shipType = document.querySelector('.shipType');
  const announcementBoard = document.querySelector('.moreInfo');

  let counterValue = counter.getCounter();

  
  if(counterValue < 5){
    const shipTypes = [5, 4, 3, 3, 2];
    const xValue = document.getElementById('xValue');
    const yValue = document.getElementById('yValue');
    const orientation = document.getElementById('orientation');
    
    const placementResult = playerBoard.placeShip(+xValue.value, +yValue.value, shipTypes[counterValue], orientation.value);

    if(placementResult === 'overlap'){
      announcementBoard.textContent = 'overlap!';
      return; 
    }

    if(placementResult === 'coordinates are not on board'){
      announcementBoard.textContent = 'coordinates are not on board!';
      return;
    }

    counter.setCounter();
    counterValue = counter.getCounter();
    document.getElementById('xValue').value = '';
    document.getElementById('yValue').value = '';


    if(counterValue === 1){
      shipType.textContent = 'Place your Battleship';
    }
  
    if(counterValue === 2){
      shipType.textContent = 'Place your Destroyer';
    }
  
    if(counterValue === 3){
      shipType.textContent = 'Place your Submarine';
    }
  
    if(counterValue === 4){
      shipType.textContent = 'Place your Patrol Boat';
    }

    if(counterValue > 4){
      const placementForm = document.getElementById('shipPLacementForm');
      placementForm.style.display = 'none';
      isShipPlacementFinished();  
    }
  }
  else{
    const placementForm = document.getElementById('shipPLacementForm');
    placementForm.style.display = 'none';
  }



  // cpu placement.
  
};

export {boardDisplay, markShips, interactivePlacement};

