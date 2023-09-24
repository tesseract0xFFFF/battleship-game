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

test('gameBoard ship placement', ()=>{
  const gameBoard1 = gameBoard();
  gameBoard1.placeShip(1, 3, 4);
  expect(gameBoard1.getShipInfo(1, 3)).toEqual({shipLength: 4, shipHits: 0, shipSunk: false,});
});