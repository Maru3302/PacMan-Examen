class MegaFood {
    constructor(ctx, x, y,playerScore) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.options = [
            { image: Gouda, scoreValue: 500 }, 
            { image: Chedar, scoreValue: 2000 }, 
            { image: Mozzarella, scoreValue: 5000 }, 
            { image: Gruyere, scoreValue: 8000 }, 
        ];
        this.selectedOption = this.getRandomOption();
        this.playerScore = playerScore;
    }
    getRandomOption() {
        const randomIndex = Math.floor(Math.random() * this.options.length);
        return this.options[randomIndex];
    }


    draw() {
        ctx.drawImage(this.selectedOption.image, this.x, this.y, 30, 30);
    }

    updatePosition(cw, ch, obstacles) {
    let newX, newY;
    do {
        newX = Math.random() * (cw - 30);
        newY = Math.random() * (ch - 30);
    } while (this.checkCollisionWithObstacles(newX, newY, obstacles));

        this.x = newX;
        this.y = newY;
    }
    checkCollisionWithObstacles(newX, newY, obstacles) {
        for (const obstacle of obstacles) {
            if (
                newX < obstacle.x + obstacle.width &&
                newX + 30 > obstacle.x &&
                newY < obstacle.y + obstacle.height &&
                newY + 30 > obstacle.y
            ) {
                return true;
            }
        }
        return false;
    }
    onEat() {
        this.playerScore += this.selectedOption.scoreValue;
        this.selectedOption = this.getRandomOption();
    }
    
   
}