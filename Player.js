class Player {
    constructor(ctx, x, y, width, height, speed) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.movement = "";
    }
    draw(direction) {

        switch (this.movement) {
            case "up":
                ctx.drawImage(PlayerUp, this.x,this.y,this.width,this.height);
                break;
            case "down":
                ctx.drawImage(PlayerDown, this.x,this.y,this.width,this.height);
                break;
            case "left":
                ctx.drawImage(PlayerLeft, this.x,this.y,this.width,this.height);
                break;
            case "right":
                ctx.drawImage(PlayerRight, this.x,this.y,this.width,this.height);
                break;
            default:
            ctx.drawImage(PlayerDefault, this.x,this.y,this.width,this.height);
                break;
        }
    }

    move(direction) {
        this.movement = direction;
    }

    update(cw, ch, food, obstacles) {
        this.draw();

        switch (this.movement) {
            case "up":
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = ch;
                }
                break;
            case "down":
                this.y += this.speed;
                if (this.y > ch) {
                    this.y = -this.height;
                }
                break;
            case "left":
                this.x -= this.speed;
                if (this.x < 0) {
                    this.x = cw;
                }
                break;
            case "right":
                this.x += this.speed;
                if (this.x > cw) {
                    this.x = -this.width;
                }
                break;
        }

        if (this.x < food.x + food.width && this.x + this.width > food.x && this.y < food.y + food.height && this.y + this.height > food.y) {
            do {
                score += 5;
                food.updatePosition(cw, ch);
            } while (food.checkCollision(obstacles));
        }

        for (const obstacle of obstacles) {
            if (this.checkCollision(obstacle)) {
                if (this.movement === "up" || this.movement === "down") {
                    this.y = this.movement === "up" ? obstacle.y + obstacle.height : obstacle.y - 50;
                }
                if (this.movement === "left" || this.movement === "right") {
                    this.x = this.movement === "left" ? obstacle.x + obstacle.width : obstacle.x - 50;
                }
                this.movement = "";
            }
        }
    }

    checkCollision(object) {
        return (
            this.x < object.x + object.width &&
            this.x + this.width > object.x &&
            this.y < object.y + object.height &&
            this.y + this.height > object.y
        );
    }
}
