
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const objectsData = [
    { "id": 1, "x": 100, "y": 150, "width": 50, "height": 50, "color": "red" },
    { "id": 2, "x": 300, "y": 200, "width": 50, "height": 50, "color": "blue" },
    { "id": 3, "x": 500, "y": 100, "width": 50, "height": 50, "color": "green" },
    { "id": 4, "x": 200, "y": 350, "width": 50, "height": 50, "color": "yellow" },
    { "id": 5, "x": 400, "y": 400, "width": 50, "height": 50, "color": "purple" }
];

const collectiblesData = [
    { "id": 1, "x": 150, "y": 150, "radius": 20, "color": "gold" },
    { "id": 2, "x": 350, "y": 250, "radius": 20, "color": "silver" },
    { "id": 3, "x": 550, "y": 150, "radius": 20, "color": "bronze" }
];


class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5;
        this.score = 0;
    }

    move(direction) {
        switch (direction) {
            case 'up':
                if (this.y > 0) this.y -= this.speed;
                break;
            case 'down':
                if (this.y < canvas.height - this.height) this.y += this.speed;
                break;
            case 'left':
                if (this.x > 0) this.x -= this.speed;
                break;
            case 'right':
                if (this.x < canvas.width - this.width) this.x += this.speed;
                break;
        }
    }

    checkCollision(object) {
        return !(this.x + this.width < object.x ||
                 this.x > object.x + object.width ||
                 this.y + this.height < object.y ||
                 this.y > object.y + object.height);
    }

    collectCollectible(collectible) {
        const distance = Math.sqrt(
            Math.pow(this.x - collectible.x, 2) + Math.pow(this.y - collectible.y, 2)
        );
        if (distance < this.width / 2 + collectible.radius) {
            this.score += 10;
            return true;
        }
        return false;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


class Collectible {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}


const player = new Player(50, 50, 40, 40, 'orange');
let objects = objectsData.map(data => new GameObject(data.x, data.y, data.width, data.height, data.color));
let collectibles = collectiblesData.map(data => new Collectible(data.x, data.y, data.radius, data.color));


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') player.move('up');
    if (event.key === 'ArrowDown') player.move('down');
    if (event.key === 'ArrowLeft') player.move('left');
    if (event.key === 'ArrowRight') player.move('right');
});


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    objects.forEach(obj => obj.draw());
    collectibles.forEach(collectible => collectible.draw());


    objects.forEach(obj => {
        if (player.checkCollision(obj)) {
            
            player.x = 50;
            player.y = 50;
        }
    });


    collectibles = collectibles.filter(collectible => {
        if (player.collectCollectible(collectible)) {
            return false; 
        }
        return true;
    });

   
    player.draw();

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + player.score, 20, 30);

    requestAnimationFrame(gameLoop);
}


gameLoop();
