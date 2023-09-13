window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 30);
        };
}());

document.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 87 :
            player.move("up");
            break;
        case 83:
            player.move("down");
            break;
        case 65:
            player.move("left");
            break;
        case 68:
            player.move("right");
            break;
        case 38 :
            player.move("up");
            break;
        case 40:
            player.move("down");
            break;
        case 37:
            player.move("left");
            break;
        case 39:
            player.move("right");
            break;
        case 80:
            PauseAll();
            break;
        case 82:
        if (gameIsOver === true || foodEating >= 353){
            resetGame(); 
        }
        else{}
            break;
    }
});

document.body.addEventListener("keydown", function () {
    const backgroundMusic = document.getElementById("background-music");
 
    switch(event.keyCode){
        case 87:
            backgroundMusic.play();
            break;
        case 83:
            backgroundMusic.play();
            break;
        case 65:
            backgroundMusic.play();
            break;
        case 68:
            backgroundMusic.play();
            break;
        case 38 :
            backgroundMusic.play();
            break;
        case 40:
            backgroundMusic.play();
            break;
        case 37:
            backgroundMusic.play();
            break;
        case 39:
            backgroundMusic.play();
            break;
        default:
            cat.pause();    
            break;
    }
    document.body.removeEventListener("keydown", arguments.callee);
});

function PauseAll() {
    paused = !paused;
    if (paused) {
        backgroundMusic.pause();
        pausedSpeed = player.speed;
        player.speed = 0;
        for (const enemy of enemies) {
            enemy.pausedSpeed = enemy.speed;
            enemy.speed = 0;
        }
    
    } else {
        backgroundMusic.play();
        player.speed = pausedSpeed;
        for (const enemy of enemies) {
            enemy.speed = enemy.pausedSpeed;
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, cw, ch);

   for (const food of foods) {
    food.draw();

        if (!food.eaten && player.checkCollision(food)) {
            food.eaten = true;
            foodEating += 1;
            score += 5;
        }
    }
    
    player.draw();
    
    for (const enemy of enemies) {
        enemy.draw();
    }

    for (const obstacle of obstacles) {
        obstacle.draw();
        
    }
    
    if (gameIsOver === true) {
        scoreGameOver();
        player.move("");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cw, ch);
        ctx.font = "35px Impact";
        ctx.fillStyle = "white";
        centerTextWindow(ctx, "GAME OVER!", 50);
        centerTextWindow(ctx, "Presiona (R) para reintentar", 110);
        centerTextWindow(ctx, "Score: " + score, 175);
        centerTextWindow(ctx, "Quesitos Comidos: " + foodEating, 240);
        const displayMinutes = Math.floor(secondsRemaining / 60);
        const displaySeconds = secondsRemaining % 60;
        centerTextWindow(ctx,"Tiempo jugado: " + `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`, 300); 
        centerImage(ctx, Loser, 350, 350, 310);
        
    }else{
        updateScoreCanvas();
        
    }

    if (paused) {
        ctx.fillStyle = "rgba(184, 184, 184,0.2)";
        ctx.fillRect(0, 0, 1000, 700);
        ctx.font = "35px Impact";
        ctx.fillStyle = "black";
        centerText(ctx, "Pausa!", 300);
        centerText(ctx, "Presiona (P) para continuar", 360);
    }
   
    if (foodEating >= 353) {
        rat.play();
        cat.pause();
        scoreGameOver();
        player.move("");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, cw, ch);
        ctx.font = "35px Impact";
        ctx.fillStyle = "white";
        centerTextWindow(ctx, "You Win!", 50);
        centerTextWindow(ctx, "Presiona (R) para jugar denuevo", 110);
        centerTextWindow(ctx, "Score: " + score, 175);
        centerTextWindow(ctx, "Quesitos Comidos: " + foodEating, 240);
        const displayMinutes = Math.floor(secondsRemaining / 60);
        const displaySeconds = secondsRemaining % 60;
        centerTextWindow(ctx,"Tiempo jugado: " + `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`, 300); 
        centerImage(ctx, Winner, 350, 350, 310);

    }
}

function centerText(ctx, text, y) {
    const textWidth = ctx.measureText(text).width;
    const x = (ctx.canvas.width  - textWidth) / 2;
    ctx.fillText(text, x, y);
}
function centerTextWindow(ctx, text, y) {
    const textWidth = ctx.measureText(text).width;
    const x = ((ctx.canvas.width + infoCtx.canvas.width )- textWidth) / 2;
    ctx.fillText(text, x, y);
}
function centerImage(ctx, image, desiredWidth, desiredHeight, y) {
    
    const imageWidth = desiredWidth;
    const imageHeight = desiredHeight;
    const x = ((ctx.canvas.width + infoCtx.canvas.width ) - imageWidth) / 2;
    ctx.drawImage(image, x, y, imageWidth, imageHeight);
}
function updateEnemies() {
    for (const enemy of enemies) {
        enemy.checkCollisionWithOtherEnemies(enemies);
        enemy.move();
        enemy.avoidTransparentObstacles(transparentObstacles);
    }
}

function update() {

    if (!paused) {
        ctx.clearRect(0, 0, cw, ch);
        let collisionDetected = false;

        if (
            !collisionDetected &&
            player.x < foods.x + 30 &&
            player.x + 50 > food.x &&
            player.y < food.y + 30 &&
            player.y + 50 > food.y
        ) {
            score += 5;
            food.updatePosition(cw, ch);
            collisionDetected = true;
        }
        for (const enemy of enemies) {
            if (player.checkCollision(enemy)) {
                cat.play();
                gameIsOver = true;
            }
            if (enemy.checkCollision(player)) {
                cat.play();
                gameIsOver = true;
            }
        }
        updateEnemies();
    }
   
    player.update(cw, ch, foods, obstacles);
    draw();
    requestAnimationFrame(update);
}

function updateScoreCanvas() {
    infoCtx.fillStyle = "black";
    infoCtx.fillRect(0,0,infoCanvas.width,infoCanvas.height);
    infoCtx.font = "24px Impact";
    infoCtx.fillStyle = "white";
    infoCtx.fillText("Score:", 20, 30);
    infoCtx.fillText(score, 20, 60);
    infoCtx.fillText("Quesitos comidos:", 20, 110);
    infoCtx.fillText(foodEating, 20, 140);

    infoCtx.fillText("Tiempo:", 20, 190); 
    const displayMinutes = Math.floor(secondsRemaining / 60);
    const displaySeconds = secondsRemaining % 60;
    infoCtx.fillText(
        `${String(displayMinutes).padStart(2, '0')}:${String(displaySeconds).padStart(2, '0')}`,
        20,
        220
    ); 

    infoCtx.fillText("Instrucciones:",20,270);
    infoCtx.drawImage(Control, 40,300, 161, 140);
    infoCtx.drawImage(ControlPaused, 20, 450, 40, 40);
    infoCtx.fillText("Pausar",80,480);
}
function scoreGameOver(){
    infoCtx.fillStyle = "black";
    infoCtx.fillRect(0,0,infoCanvas.width,infoCanvas.height);

}
function resetGame() {
    if (!backgroundMusic.paused) {
        backgroundMusic.pause();
    }
    backgroundMusic.currentTime = 0;
    
    if (!cat.paused) {
        cat.pause();
    }
    cat.currentTime = 0;
    rat.pause();
    rat.currentTime = 0;

    score = 0;
    foodEating = 0;
    gameIsOver = false;

    player.x = 275;
    player.y = 275;

    secondsRemaining = 0;

    for (const enemy of enemies) {
        enemy.spawnRandomPosition();
    }

    for (const food of foods) {
        food.eaten = false;
    }    
    
    startTimer();
    backgroundMusic.play();
}

let minutes = 0;
let maxSeconds = 1800;
let secondsRemaining = minutes * 60;
let timerInterval;


function startTimer() {
    clearInterval(timerInterval); 

    timerInterval = setInterval(() => {
        if (!paused) {
            const displayMinutes = Math.floor(secondsRemaining / 60);
            const displaySeconds = secondsRemaining % 60;

            if (foodEating >= 353 || gameIsOver === true) {
                clearInterval(timerInterval); 
            } else {
                secondsRemaining++; 
            }
        }
    }, 1000); 
}
function randomInteger(max) {
    return Math.floor(Math.random() * (max + 1));
}
