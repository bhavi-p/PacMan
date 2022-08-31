let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

let count = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(400);
  let focus = 0;
  let direction = 0;

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './images/PacMan1.png';
  newimg.width = 100;
  newimg.focus = focus;
  newimg.direction = direction;

  // TODO: set position here
  newimg.style.position.left = position.x;
  newimg.style.position.top = position.y;
  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  count++;
  if(count == 10){
    count = 0;
    pacMen.forEach((item) => {
      item.newimg.focus = (item.newimg.focus + 1) % 2;
      item.newimg.src = pacArray[item.newimg.direction][item.newimg.focus];
    });
  }
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if(item.newimg.width + item.position.x >= window.innerWidth || item.position.x < 0){
    item.velocity.x = -item.velocity.x;
    item.newimg.direction = (item.newimg.direction + 1) % 2;
    item.newimg.src = pacArray[item.newimg.direction][item.newimg.focus];
  }

  if(item.newimg.height + item.position.y >= window.innerHeight +1 || item.position.y < 0){
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

function reset() {
  location.reload();
  return false;
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
