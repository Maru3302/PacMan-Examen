

class Enemy {
    constructor(ctx, width, height, speed, player, obstacles) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.player = player;
        this.obstacles = obstacles;
        this.x = 0;
        this.y = 0;
        this.direction = this.randomDirection(); 
        this.spawnRandomPosition();
    }

    draw() {
        ctx.drawImage(EnemysIcon, this.x,this.y,this.width,this.height);
    }

    spawnRandomPosition() {
        let validPosition = false;
        
        while (!validPosition) {
            const randomX = randomInteger(cw - this.width);
            const randomY = randomInteger(ch - this.height);
            
            const distance = Math.sqrt(
                Math.pow(randomX - this.player.x, 2) + Math.pow(randomY - this.player.y, 2)
            );

            if(distance >105 ){
                
                const collidesWithObstacle = this.obstacles.some(obstacle => {
                    return (
                        randomX < obstacle.x + obstacle.width &&
                        randomX + this.width > obstacle.x &&
                        randomY < obstacle.y + obstacle.height &&
                        randomY + this.height > obstacle.y
                    );
                });
                
                if (!collidesWithObstacle) {
                    this.x = randomX;
                    this.y = randomY;
                    validPosition = true;
                }
                
            }
            
        }
    }

    isTooCloseToPlayer() {
        const distance = Math.sqrt(
            Math.pow(this.x - this.player.x, 2) + Math.pow(this.y - this.player.y, 2)
        );
        return distance < 100;
    }

    randomDirection() {
        const directions = ["up", "down", "left", "right"];
        return directions[Math.floor(Math.random() * directions.length)];
    }

    move() {

        switch (this.direction) {
            case "up":
                this.y -= this.speed;
                break;
            case "down":
                this.y += this.speed;
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
        if (this.checkCollision(this.obstacles)) {
            this.x -= this.speed;
            this.randomDirection();
        }
    
        this.avoidObstacles();
    }

    avoidObstacles() {
    
        let nextX = this.x;
        let nextY = this.y;

        switch (this.direction) {
            case "up":
                nextY -= this.speed;
                break;
            case "down":
                nextY += this.speed;
                break;
            case "left":
                nextX -= this.speed;
                break;
            case "right":
                nextX += this.speed;
                break;
        }

        let canMove = true;

        for (const obstacle of this.obstacles) {
            if (
                nextX < obstacle.x + obstacle.width &&
                nextX + this.width > obstacle.x &&
                nextY < obstacle.y + obstacle.height &&
                nextY + this.height > obstacle.y
            ) {
                canMove = false;
                break;
            }
        }

        if (!canMove) {
            
            const possibleDirections = ["up", "down", "left", "right"];
            const safeDirections = possibleDirections.filter(direction => {
                let testX = this.x;
                let testY = this.y;

                switch (direction) {
                    case "up":
                        testY -= this.speed;
                        break;
                    case "down":
                        testY += this.speed;
                        break;
                    case "left":
                        testX -= this.speed;
                        break;
                    case "right":
                        testX += this.speed;
                        break;
                }

                let canMoveSafely = true;

                for (const obstacle of this.obstacles) {
                    if (
                        testX < obstacle.x + obstacle.width &&
                        testX + this.width > obstacle.x &&
                        testY < obstacle.y + obstacle.height &&
                        testY + this.height > obstacle.y
                    ) {
                        canMoveSafely = false;
                        break;
                    }
                }

                return canMoveSafely;
            });

            
            if (safeDirections.length > 0) {
                this.direction = safeDirections[Math.floor(Math.random() * safeDirections.length)];
            } else {
               
                this.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
            }
        }
    }

    avoidTransparentObstacles(transparentObstacles) {
        let nextX = this.x;
        let nextY = this.y;

        switch (this.direction) {
            case "up":
                nextY -= this.speed;
                break;
            case "down":
                nextY += this.speed;
                break;
            case "left":
                nextX -= this.speed;
                break;
            case "right":
                nextX += this.speed;
                break;
        }

        let canMove = true;

        for (const obstacle of transparentObstacles) {
            if (
                nextX < obstacle.x + obstacle.width &&
                nextX + this.width > obstacle.x &&
                nextY < obstacle.y + obstacle.height &&
                nextY + this.height > obstacle.y
            ) {
                canMove = false;
                break;
            }
        }

        if (!canMove) {
            
            const possibleDirections = ["up", "down", "left", "right"];
            const safeDirections = possibleDirections.filter(direction => {
                let testX = this.x;
                let testY = this.y;

                switch (direction) {
                    case "up":
                        testY -= this.speed;
                        break;
                    case "down":
                        testY += this.speed;
                        break;
                    case "left":
                        testX -= this.speed;
                        break;
                    case "right":
                        testX += this.speed;
                        break;
                }

                let canMoveSafely = true;

                for (const obstacle of this.obstacles) {
                    if (
                        testX < obstacle.x + obstacle.width &&
                        testX + this.width > obstacle.x &&
                        testY < obstacle.y + obstacle.height &&
                        testY + this.height > obstacle.y
                    ) {
                        canMoveSafely = false;
                        break;
                    }
                }

                return canMoveSafely;
            });

            
            if (safeDirections.length > 0) {
                this.direction = safeDirections[Math.floor(Math.random() * safeDirections.length)];
            } else {
               
                this.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
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

    checkCollisionWithOtherEnemies(enemies) {
        for (const enemy of enemies) {
            if (enemy !== this && this.checkCollision(enemy)) {
                this.direction = this.randomDirection();
                break;
            }
        }
    }
}

