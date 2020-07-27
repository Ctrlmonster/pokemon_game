class Attack {
  constructor(pokemon, direction, enemyPokemon) {
    this.x = pokemon.x;
    this.y = pokemon.y
    this.color = pokemon.attack_color;
    this.active = true;
    this.direction = direction;
    this.pokemon = pokemon;
    this.enemyPokemon = enemyPokemon;

    // add the attack to the pokemon
    pokemon.attacks.push(this);
  }

  checkForHit() {
    if (this.x >= this.enemyPokemon.x && this.x <= this.enemyPokemon.x + 200) {
      if (this.y >= this.enemyPokemon.y && this.y <= this.enemyPokemon.y + 200) {

        if (this.enemyPokemon.hp > 0) {
          this.enemyPokemon.hp -= 5;
          this.active = false;
        }
      }
    }
  }

  update() {
    this.x += attack_speed * this.direction;
    this.y += 0; //attack_speed; y attack speed unnecessary?

    if (this.x > 1200 || this.x < 0 || this.y > 900 || this.y < 0) {
      this.active = false;
    }

    this.checkForHit()
  }

  draw() {
    fill(this.color);
    ellipse(this.x, this.y, attack_size, attack_size)
  }
}

class Pokemon {
  constructor(x, y, attack_color, name, leftPokemon) {
    this.x = x;
    this.y = y;
    this.attack_color = attack_color;
    this.image = null;
    this.attacks = [];
    this.name = name;
    this.hp = 100;
    this.leftPokemon = leftPokemon;

  }
  setImage(img) {
    this.image = img;
  }

  update() {
    this.attacks = this.attacks.filter(attack => attack.active); // remove unactive attacks (outside of screen)
    this.attacks.forEach(attack => {
      attack.update();
    })
  }

  draw() {
    // write name and hp
    if (this.hp > 0) fill(255)
    else fill(255, 0, 0);
    textSize(45);
    //text(this.name, 40, 40)
    if (this.leftPokemon) {
      text(this.hp, 120, 40)
    }
    else {
      text(this.hp, 1000, 40)
    }
    // draw pokemon
    image(this.image, this.x, this.y);

    // draw all attacks
    this.attacks.forEach(attack => {
      attack.draw();
    })
  }
}

// lade bild
let mewtu_img, glurak_img;
function preload() {
  mewtu_img = loadImage('assets/mewtu_front.png');
  glurak_img = loadImage('assets/glurak_front.png')
}

// variablen
let mewtu_position = {x:50, y:100};
let glurak_position = {x: 900, y: 100};
let pokemon_speed = 30;
let attack_speed = 5;
let attack_size = 22;

let mewtu;



function setup() {
  createCanvas(1200, 900);

  mewtu = new Pokemon(50, 100, [150, 0, 150], 'Mewtu', true);
  glurak = new Pokemon(900, 100, [250, 50, 0], 'Glurak', false);

  mewtu.setImage(mewtu_img);
  glurak.setImage(glurak_img);

  fill(255);
}

window.addEventListener('keydown', function(evt) {
  switch (evt.key) {
    // mewtu steuerung
    case "w":
      if (mewtu.y >= 0) mewtu.y -= pokemon_speed;
      break;
    case "s":
      if (mewtu.y < 700) mewtu.y += pokemon_speed;
      break;
    case "a":
      if (mewtu.x >= 0) mewtu.x -= pokemon_speed;
      break;
    case "d":
      if (mewtu.x <= 1000) mewtu.x += pokemon_speed;
      break;
    case "f":
      new Attack(mewtu, 1, glurak)
      break;

    // glurak steuerung
    case "i":
      if (glurak.y >= 0) glurak.y -= pokemon_speed;
      break;
    case "k":
      if (glurak.y < 700) glurak.y += pokemon_speed;
      break;
    case "j":
      if (glurak.x >= 0) glurak.x -= pokemon_speed;
      break;
    case "l":
      if (glurak.x <= 1000) glurak.x += pokemon_speed;
      break;
    case "h":
      new Attack(glurak, -1, mewtu)
      break;
  }
});


function draw() {

  background(25);

  mewtu.update();
  mewtu.draw();

  glurak.update();
  glurak.draw();


  //image(mewtu_img, mewtu_position.x, mewtu_position.y);
  //image(glurak_img, glurak_position.x, glurak_position.y);

}
