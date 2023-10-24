import {ship, gameBoard} from './shipsAndGameBoards';
import {player, cpuTurn} from './players';
import { boardDisplay, markShips } from './display';
// will prob import from display later.
import './style.css';

const gameloop = (() => {

  // set up boards.
  const cpuGameBoard = gameBoard();
  const playerGameBoard = gameBoard();
  //   placing a ship on the cpu's board, i still have to indicate bad ship placement!
  cpuGameBoard.placeShip(7, 4, 5, 'vertical');
  cpuGameBoard.placeShip(1, 2, 4, 'horizontal');
  cpuGameBoard.placeShip(0, 5, 3, 'horizontal');
  cpuGameBoard.placeShip(0, 1, 3, 'horizontal');
  cpuGameBoard.placeShip(3, 6, 2, 'vertical');
  // placing on player's gameboard.
  playerGameBoard.placeShip(7, 4, 5, 'vertical');
  playerGameBoard.placeShip(1, 2, 4, 'horizontal');
  playerGameBoard.placeShip(0, 5, 3, 'horizontal');
  playerGameBoard.placeShip(0, 1, 3, 'horizontal');
  playerGameBoard.placeShip(3, 6, 2, 'vertical');

  //   set up player and cpu.
  const cpu = cpuTurn(playerGameBoard);
  const player1 = player(cpuGameBoard);
  // set up display.
  boardDisplay(player1, cpu, playerGameBoard, cpuGameBoard);
  markShips(playerGameBoard);
  // i still have to implement turns and make sure cpu attacks work.
})();