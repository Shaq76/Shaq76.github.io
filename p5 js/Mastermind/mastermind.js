let game;

function setup() {
  // put setup code here
  createCanvas(2000, 1000);
  game = new Game();

  let button = createButton('Next Move');
  button.position(50, 50);
  button.mousePressed(nextMove);

  button = createButton('Reveal Answer');
  button.position(150,50);
  button.mousePressed(revealAnswer);
}

function revealAnswer(){
  game.showAnswer = true;
}
function nextMove(){
  game.NextMove();
}

function mouseClicked() {
  game.mouseClicked();
  // prevent default
  return false;
}

function draw() {
  // put drawing code here
  background('#BBBBBB');

  game.Draw();
}
