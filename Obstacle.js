


class Obstacle {
    constructor(ctx, x, y, width, height, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}
class TransparentObstacle extends Obstacle {
    constructor(ctx, x, y, width, height, color, isTransparent) {
        super(ctx, x, y, width, height, color);
        this.isTransparent = isTransparent;
    }
}
