import {ship, gameBoard} from './shipsAndGameBoards';
import {player, cpuTurn} from './players';
import { boardDisplay } from './display';
// will prob import from display later.
import './style.css';

const gameloop = (() => {

  // set up boards.
  const cpuGameBoard = gameBoard();
  const playerGameBoard = gameBoard();
  //   placing a ship, i still have to indicate bad ship placement!
  cpuGameBoard.placeShip(0, 0, 4, 'horizontal');
  cpuGameBoard.placeShip(5, 5, 3, 'vertical');
  //   set up player and cpu.
  const cpu = cpuTurn(playerGameBoard);
  const player1 = player(cpuGameBoard);
  // set up display.
  boardDisplay(player1);

  // i still have to implement turns and make sure cpu attacks work.
})();