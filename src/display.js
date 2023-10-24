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

  for(let i = 0; i < gameboard.shipPlacementTracker.length; i++){
    const coordinatesArray = gameboard.shipPlacementTracker[i].split(',');
    const shipXValue = coordinatesArray[0].trim();
    const shipYValue = coordinatesArray[1].trim();
    const correspondingShipElement = document.querySelector(`[data-x="${shipXValue}"][data-y="${shipYValue}"]`);
    correspondingShipElement.classList.add('playerShip');
  }

};

export {boardDisplay, markShips};

