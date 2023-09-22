import ship from './src/ship.js';

test('ship hit test', ()=>{
  const ship1 = ship(3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.getTimesHit()).toBe(3);
  expect(ship1.isSunk()).toBe(true);
});