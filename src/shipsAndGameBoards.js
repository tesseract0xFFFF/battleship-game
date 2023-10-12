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
  // tracks coordinates that have already been shot at.
  const hitTracker = [];
  // will probably try creating a counter of sunken ships that will turn the 
  // allSunk variable to 'true' once it reaches 10;
  let sunkCounter = 0;
  let allSunk = false;

  for (let i = 0; i < (columns); i += 1) {
    boardArray[i] = [];
    for (let j = 0; j < (rows); j += 1) {
      boardArray[i][j] = null;
    }
  }


  const checkPlacement = (x, y, length, orientation) => {
    // not to forget that array indexes are 0 to 9.
    // checks if ship placement is contained within the board.
    // did not handle bad input.
    if(x >= 10 || x < 0 || y >=10 || y < 0){
      return 'coordinates are not on board';
    }

    // i am also aware there are no checks to see if a ship is being placed over another.

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

    if(x >= 10 || x < 0 || y >=10 || y < 0){
      return 'coordinates are not on board';
    }
    // yes, i know i am checking the coordinates twice :D
  
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
    // code for testing purposes.
    // not sure this function is needed at at all, it just helps me debug better.
    // might be deleted after developement is complete.
    if(boardArray[y][x] === null){
      return 'no ship detected';
    }
    else{
      const shipLength = boardArray[y][x].getLength();
      const shipHits = boardArray[y][x].getTimesHit();
      const shipSunk = boardArray[y][x].getSunkenStatus();
      return {shipLength, shipHits, shipSunk,};
    }
  };

  const checkHitTracker = (x, y) => {
    // checks if coordinates were already hit.
    const stringifyInput = x.toString() + ', ' + y.toString(); 
    for(let i = 0; i < hitTracker.length; i++){
      if (hitTracker[i] === stringifyInput){
        return true;
      }
    }
  };

  const receiveAttack = (x, y) => {
    // Gameboards should have a receiveAttack function 
    // that takes a pair of coordinates, determines whether or not the attack hit 
    // a ship and then sends the ‘hit’ function to the correct ship, 
    // or records the coordinates of the missed shot.

    if(x >= 10 || x < 0 || y >=10 || y < 0){
      return 'coordinates are not on board';
    }

    const wasHitOrNot = checkHitTracker(x, y);
    const stringifyInput = x.toString() + ', ' + y.toString();  


    if(wasHitOrNot === true){
      return 'was hit already';
    }
    

    // On miss, store the value 1 in the array.
    if(boardArray[y][x] === null){
      boardArray[y][x] = 1;
      // update hitTracker.
      hitTracker.push(stringifyInput);
      return 'a miss';
    }

    if(typeof boardArray[y][x] === 'object'){

      
      boardArray[y][x].hit();
      // will check whether the ship has sunk after every hit.
      if(boardArray[y][x].isSunk() === true){
        hitTracker.push(stringifyInput);
        sunkCounter += 1;
        return 'ship has sunk!';
      }
      // update hitTracker;
      hitTracker.push(stringifyInput);
      return 'hit';
    }

  };

  const checkAllShipsSunk = () => {
    if(sunkCounter === 3){
      allSunk = true;
    }
    return {a: allSunk, b: sunkCounter};
  };


  // Will obviously remove some of those factory function exports soon...
  return {placeShip, receiveAttack, getShipInfo, checkPlacement, checkAllShipsSunk,};
};





export {ship, gameBoard};














