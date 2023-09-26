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