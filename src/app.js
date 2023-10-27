import {ship, gameBoard} from './shipsAndGameBoards';
import {player, cpuTurn} from './players';
import { boardDisplay, markShips, interactivePlacement } from './display';
// will prob import from display later.
import './style.css';





const gameloop = (() => {


  // use this counter for initial ship placement.
  const shipCounter = () =>{  

    let shipPlacementCounter = 0;

    const getCounter = () => shipPlacementCounter;
    const setCounter = () => shipPlacementCounter += 1;

    return {getCounter, setCounter };

  };

  const placementCounter = shipCounter();



  // set up boards.
  const cpuGameBoard = gameBoard();
  const playerGameBoard = gameBoard();

  const cpu = cpuTurn(playerGameBoard);
  const player1 = player(cpuGameBoard);

  // ship placement.
  const placeButt = document.getElementById('placeShip');

  // renders ships.
  const isShipPlacementFinished = () => {
    boardDisplay(player1, cpu, playerGameBoard, cpuGameBoard);
    markShips(playerGameBoard);
  };


  placeButt.addEventListener('click', () => {interactivePlacement(playerGameBoard, cpuGameBoard, placementCounter, isShipPlacementFinished);});

})();