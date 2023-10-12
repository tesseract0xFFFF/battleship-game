import {ship, gameBoard} from './src/shipsAndGameBoards.js';

test('ship hit test', ()=>{
  const ship1 = ship(3);
  const ship2 = ship(5);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship2.hit();
  expect(ship1.getLength()).toBe(3);
  expect(ship1.getTimesHit()).toBe(3);
  expect(ship1.isSunk()).toBe(true);
  expect(ship2.getLength()).toBe(5);
  expect(ship2.getTimesHit()).toBe(1);
  expect(ship2.isSunk()).toBe(false);
});

// test('gameBoard ship placement', ()=>{
//   const gameBoard1 = gameBoard();
//   gameBoard1.placeShip(1, 3, 4);
//   // still have to check if the 'recieveAttack function has an effect on ships and empty coordinates'
//   expect(gameBoard1.getShipInfo(1, 3)).toEqual({shipLength: 4, shipHits: 0, shipSunk: false,});
//   // no ship detected.
//   expect(gameBoard1.getShipInfo(4, 5)).toBe('no ship detected');
// });


test('Testing the checkPlacements function', ()=>{
  const gameBoard2 = gameBoard();
  expect(gameBoard2.checkPlacement(9, 5, 2, 'horizontal')).toBe(false);
  expect(gameBoard2.checkPlacement(1, 7, 3, 'vertical')).toBe(true);
  expect(gameBoard2.checkPlacement(7, -1, 3, 'vertical')).toBe('coordinates are not on board');
  expect(gameBoard2.checkPlacement(-2, 5, 3, 'vertical')).toBe('coordinates are not on board');
});

test('Ship placement', ()=>{
  const gameBoard3 = gameBoard();
  gameBoard3.placeShip(1, 7, 3, 'vertical');
  // still have to check if the 'recieveAttack function has an effect on ships and empty coordinates'
  expect(gameBoard3.getShipInfo(1, 8)).toEqual({shipLength: 3, shipHits: 0, shipSunk: false,});
  expect(gameBoard3.getShipInfo(1, 9)).toEqual({shipLength: 3, shipHits: 0, shipSunk: false,});
  // no ship detected.
  expect(gameBoard3.getShipInfo(4, 5)).toBe('no ship detected');
});

test('recieveAttack', () => {
  const gameBoard4 = gameBoard();
  gameBoard4.placeShip(1, 7, 3, 'vertical');
  expect(gameBoard4.receiveAttack(1, 6)).toBe('a miss');
  expect(gameBoard4.receiveAttack(1, 7)).toBe('hit');
  expect(gameBoard4.receiveAttack(1, 8)).toBe('hit');
  expect(gameBoard4.receiveAttack(1, 9)).toBe('ship has sunk!');
  // need to test an isSunk functionality.
  expect(gameBoard4.getShipInfo(1, 7)).toEqual({shipLength: 3, shipHits: 3, shipSunk: true,});
});

// write a test for all ships destroyed situation.
test('all ships destroyed', () => {
  const gameBoard5 = gameBoard();
  gameBoard5.placeShip(1, 7, 3, 'vertical');
  expect(gameBoard5.receiveAttack(1, 7)).toBe('hit');
  expect(gameBoard5.receiveAttack(1, 8)).toBe('hit');
  expect(gameBoard5.receiveAttack(1, 9)).toBe('ship has sunk!');
  gameBoard5.placeShip(5, 7, 3, 'horizontal');
  expect(gameBoard5.receiveAttack(5, 7)).toBe('hit');
  expect(gameBoard5.receiveAttack(6, 7)).toBe('hit');
  expect(gameBoard5.receiveAttack(7, 7)).toBe('ship has sunk!');
  gameBoard5.placeShip(8, 3, 3, 'vertical');
  expect(gameBoard5.receiveAttack(8, 3)).toBe('hit');
  expect(gameBoard5.receiveAttack(8, 4)).toBe('hit');
  expect(gameBoard5.receiveAttack(8, 5)).toBe('ship has sunk!');

  expect(gameBoard5.checkAllShipsSunk()).toStrictEqual({a: true, b: 3});
});
