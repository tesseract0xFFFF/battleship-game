import {ship, gameBoard} from './shipsAndGameBoards.js';


const player = (gameboard) => {
  let playerScore = 0;
  const getScore = () => playerScore;
  const playerAttack = (x, y) => {
    let attack = gameboard.receiveAttack(x, y);

    if(attack === 'was hit already'){
      return console.log('was hit already, please enter a different pair of coordinates');
    }
    if(attack === 'ship has sunk!'){
      playerScore += 1;
      return 'ship has sunk!';
    }

    if(attack === 'hit'){
      return 'hit';
    }

    if(attack === 'a miss'){
      return 'a miss';
    }

  };

  return {playerAttack, getScore};

};

const cpuTurn = (gameboard) => {
  let cpuScore = 0;

  const getScore = () => cpuScore;
  const cpuRandomChoice = () => Math.floor(Math.random() * 9);

  const getCPURandomCoordinates = () => {
    const x = cpuRandomChoice();
    const y = cpuRandomChoice();
    return [x, y]; 
  };

  const cpuAttack = () => {
    // so far it generates random coords and then checks whether they are valid or not.
    let randCoords = getCPURandomCoordinates();

    let attack = gameboard.receiveAttack(randCoords[0], randCoords[1]);

    // make sure to implement a mechanism that prevents an infinite loop in case all coords were hit.
    while(attack === 'was hit already'){
      randCoords = getCPURandomCoordinates();
      attack = gameboard.receiveAttack(randCoords[0], randCoords[1]);
    }

    if(attack === 'ship has sunk!'){
      cpuScore += 1;
    }

    // now it needs to attack. will prob utilize the player gameboard's recieveAttack method.
    // 
  };
  

  return {getScore, cpuAttack};
};

export {player, cpuTurn};