const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let player;
let cursors;
let stars;
let spikes;
let platforms;
let score = 0;
let scoreText;
let level = 1;
let levelText;

const game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "https://labs.phaser.io/assets/skies/space3.png");
  this.load.image("ground", "https://labs.phaser.io/assets/sprites/platform.png");
  this.load.image("star", "https://labs.phaser.io/assets/sprites/star.png");
  this.load.image("spike", "https://labs.phaser.io/assets/sprites/spike.png");
  this.load.spritesheet("dude", "https://labs.phaser.io/assets/sprites/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });
}

function create() {
  this.add.image(400, 300, "sky");

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  player = this.physics.add.sprite(100, 450, "dude");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(star => {
    star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    star.setGravityY(Phaser.Math.Between(50, 200));
  });

  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, null, this);

  spikes = this.physics.add.group({
    key: "spike",
    repeat: 4,
    setXY: { x: 100, y: 400, stepX: 200 }
  });

  spikes.children.iterate(spike => {
    spike.setImmovable(true);
  });

  this.physics.add.collider(spikes, platforms);
  this.physics.add.collider(player, spikes, hitSpike, null, this);

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.on("keydown-SPACE", () => {
    if (player.body.touching.down) {
      player.setVelocityY(-330);
    }
  });

  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#ffffff"
  });

  levelText = this.add.text(16, 48, "Level: 1", {
    fontSize: "24px",
    fill: "#ffffff"
  });
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }

  if (score > 0 && stars.countActive(true) === 0) {
    nextLevel.call(this);
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText("Score: " + score);
}

function hitSpike(player, spike) {
  player.setTint(0xff0000);
  player.anims.play("turn");
  this.time.delayedCall(1000, () => {
    this.scene.restart();
    score = 0;
  });
}

function nextLevel() {
  level += 1;
  levelText.setText("Level: " + level);
  score = 0;
  scoreText.setText("Score: " + score);

  stars.children.iterate(star => {
    star.enableBody(true, Phaser.Math.Between(50, 750), 0, true, true);
    star.setGravityY(Phaser.Math.Between(100, 300));
  });

  spikes.children.iterate(spike => {
    spike.setPosition(Phaser.Math.Between(100, 700), 450);
  });

  player.setPosition(100, 450);
}
