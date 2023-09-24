const ship = (length) => {
  let shipLength = length;
  let timesHit = 0;
  let sunkOrNot = false;

  // functions that get our values.
  const getLength = ()=> length;
  const getTimesHit = ()=> timesHit;
  //   might be redundant, as isSunk already returns sunkOrNot after an additional check.
  const getSunkenStatus = ()=> sunkOrNot;

  const hit = () => {
    timesHit += 1;
  };

  const isSunk = () => {
    if (timesHit === shipLength){
      sunkOrNot = true;
    }
    return sunkOrNot;
  };

  return {getLength, getTimesHit, getSunkenStatus, hit, isSunk};
};



const gameBoard = () => {
  const rows = 10;
  const columns = 10;
  const boardArray = [];

  for (let i = 0; i < (rows); i += 1) {
    boardArray[i] = [];
    for (let j = 0; j < (columns); j += 1) {
      boardArray[i][j] = [];
    }
  }
  // So far, the coordinates are numbers only. Will use letters as Y values on display.
  const placeShip = (x, y, length) => {
    // Gameboards should be able to place ships at specific coordinates 
    // by calling the ship factory function.
    const shipToBePlaced = ship(length);
    boardArray[x][y] = shipToBePlaced;
  };
  
  // Dumps ship info into an object.
  const getShipInfo = (x, y) => {
    const shipLength = boardArray[x][y].getLength();
    const shipHits = boardArray[x][y].getTimesHit();
    const shipSunk = boardArray[x][y].getSunkenStatus();
    return {shipLength, shipHits, shipSunk,};
  };

  const receiveAttack = () => {
    // Gameboards should have a receiveAttack function 
    // that takes a pair of coordinates, determines whether or not the attack hit 
    // a ship and then sends the ‘hit’ function to the correct ship, 
    // or records the coordinates of the missed shot.
  };


  return {placeShip, receiveAttack, getShipInfo};
};




export {ship, gameBoard};














