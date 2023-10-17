// experimenting a bit...

const playerBoard = document.querySelector('.playerGameboard');
const cpuBoard = document.querySelector('.cpuGameboard');


for(let i=0; i<10;i++){
  for(let j=0;j<10;j++){
    const cellPlayer = document.createElement('div');
    const cellCPU = document.createElement('div');
    playerBoard.append(cellPlayer);
    cpuBoard.append(cellCPU);
  }    
}