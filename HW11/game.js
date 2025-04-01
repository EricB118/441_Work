
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


class GameObject {
    constructor(x, y, width, height, color, dx = 0, dy = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
    
    checkEdgeCollision() {
        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.dx = -this.dx;  
        }
        if (this.y <= 0 || this.y + this.height >= canvas.height) {
            this.dy = -this.dy;  
        }
    }


    checkCollision(otherObj) {
        if (this.x < otherObj.x + otherObj.width &&
            this.x + this.width > otherObj.x &&
            this.y < otherObj.y + otherObj.height &&
            this.y + this.height > otherObj.y) {
            return true;
        }
        return false;
    }

    resizeOnCollision() {
        this.width *= 1.1;
        this.height *= 1.1;
    }
}


const userObject = new GameObject(50, 50, 50, 50, "blue");
const autoObject = new GameObject(300, 200, 50, 50, "red", 2, 2);


document.addEventListener("keydown", (e) => {
    const speed = 5;
    if (e.key === "ArrowUp") userObject.y -= speed;
    if (e.key === "ArrowDown") userObject.y += speed;
    if (e.key === "ArrowLeft") userObject.x -= speed;
    if (e.key === "ArrowRight") userObject.x += speed;
});


document.getElementById("backgroundMusic").play();


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  

    userObject.draw();
    autoObject.draw();
    autoObject.move();
    autoObject.checkEdgeCollision();


    if (userObject.checkCollision(autoObject)) {
        canvas.style.backgroundColor = getRandomColor();
        userObject.resizeOnCollision();
        autoObject.resizeOnCollision();
    }

    userObject.checkEdgeCollision();

    requestAnimationFrame(gameLoop);  
}


function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


gameLoop();
