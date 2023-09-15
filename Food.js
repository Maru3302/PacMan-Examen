class Food {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.eaten = false;
    }

    draw(color) {
        if (!this.eaten) {
            ctx.drawImage(Cheese, this.x,this.y,this.width,this.height);
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
