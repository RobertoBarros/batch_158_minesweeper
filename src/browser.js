const rows = 15;
const cols = 15;
const minesCount = 30;
const mines = [];

const countNeighborsMines = (row, col) => {
  let count = 0;
  if(hasMine(row-1, col-1)){ count += 1;}
  if(hasMine(row-1, col)){ count += 1;}
  if(hasMine(row-1, col+1)){ count += 1;}

  if(hasMine(row, col-1)){ count += 1;}
  if(hasMine(row, col+1)){ count += 1;}

  if(hasMine(row+1, col-1)){ count += 1;}
  if(hasMine(row+1, col)){ count += 1;}
  if(hasMine(row+1, col+1)){ count += 1;}

  return count;
}

const plantMines = () => {
  for(let i = 0; i < minesCount; i += 1){
    mines.push([Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)]);
  }
  console.log(`Mines in ${mines}`);
}

const hasMine = (row, col) => {
  let mine = false;
  mines.forEach( m => {
    if(m[0] === row && m[1] === col){
      mine = true
    }
  });
  return mine;
}

const openTile = (tile) => {
  const row = parseInt(tile.dataset.row);
  const col = parseInt(tile.dataset.col);
  console.log(`clicked row=${row} col=${col}`);

  tile.classList.remove('unopened');

  if(hasMine(row, col)){
    tile.classList.add('mine');
  } else {
    let count = countNeighborsMines(row, col);
    if(count === 0){
      tile.classList.add('opened');
    }
    else {
      tile.classList.add(`mine-neighbour-${count}`)
    }
  }
}

const grid = () => {
  const table = document.createElement('table');
  table.setAttribute('id','minesweeper');

  for(let i = 0; i < rows; i+= 1) {
    const row = document.createElement('tr');
    for(let j = 0; j < cols; j += 1){
      const tile = document.createElement('td');
      tile.classList.add('unopened');
      tile.dataset.row = i;
      tile.dataset.col = j;

      tile.addEventListener('click', (event) => {
        openTile(event.currentTarget);
      })

      row.appendChild(tile);
    }
    table.appendChild(row);
  }
  return table;
}

plantMines();
const game = document.getElementById('game');
game.appendChild(grid());