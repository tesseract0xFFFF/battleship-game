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

  for (let i = 0; i < (columns); i += 1) {
    boardArray[i] = [];
    for (let j = 0; j < (rows); j += 1) {
      boardArray[i][j] = [];
    }
  }


  const checkPlacement = (x, y, length, orientation) => {
    // not to forget that array indexes are 0 to 9!
    // checks if ship is contained within the board.
    if(orientation === 'horizontal'){
      if(x + (length -1) < 10){
        return true;
      }
      else{
        return false;
      }
    }

    if(orientation === 'vertical'){
      if(y + (length - 1) < 10){
        return true;
      }
      else{
        return false;
      }
    }

    else {
      return 'one of the arguments is missing';
    }
      
    

  };



  // So far, the coordinates are numbers only. Will use letters as Y values on display.
  const placeShip = (x, y, length, orientation) => {
    // Gameboards should be able to place ships at specific coordinates 
    // by calling the ship factory function.

    // returns true if valid placement and false if not valid.
    const placementCheck = checkPlacement(x, y, length, orientation);

    if(placementCheck === true){

      // generates a ship.
      const shipToBePlaced = ship(length);
        
      if(orientation === 'horizontal'){
        for(let i = 0; i < length; i++){
          boardArray[y][x + i] = shipToBePlaced;
        }
      }

      if(orientation === 'vertical'){
        for(let i = 0; i < length; i++){
          boardArray[y + i][x] = shipToBePlaced;
        }
      }

    }
    else{
      // will use this as 
      return 0; 
    }

  
  };

  
  
  // Dumps ship info into an object.
  const getShipInfo = (x, y) => {
    // placeholder code for testing purposes.
    // not sure this function is needed at at all, it just helps me debug better.
    // might be deleted after developement is complete.
    if(boardArray[y][x].length === 0){
      return 'no ship detected';
    }
    else{
      const shipLength = boardArray[y][x].getLength();
      const shipHits = boardArray[y][x].getTimesHit();
      const shipSunk = boardArray[y][x].getSunkenStatus();
      return {shipLength, shipHits, shipSunk,};
    }
  };

  const receiveAttack = () => {
    // Gameboards should have a receiveAttack function 
    // that takes a pair of coordinates, determines whether or not the attack hit 
    // a ship and then sends the ‘hit’ function to the correct ship, 
    // or records the coordinates of the missed shot.
  };


  return {placeShip, receiveAttack, getShipInfo, checkPlacement, boardArray};
};





export {ship, gameBoard};














