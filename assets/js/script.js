window.onload = () => {
    let stage = document.getElementById('stage');
    let context = stage.getContext('2d');

    let currentScore = document.getElementById('current-score');
    let topScore = document.getElementById('top-score');
    
    let gameOver = document.getElementById('game-over');

    document.addEventListener('keydown', keyPush);

    setInterval(game, 60);

    const speed = 1;

    let speedX = 0;
    let speedY = 0;

    let positionX = 0;
    let positionY = 0;

    let length = 20;
    let count = 20;

    let targetX = Math.floor(Math.random() * count);
    let targetY = Math.floor(Math.random() * count);

    let trail = [];
    let snakeWidth = 5;

    let hasStarted = false;

    function game() {
        positionX += speedX;
        positionY += speedY;

        if (positionX < 0) {
            positionX = count - 1;
        }

        if (positionX > count - 1) {
            positionX = 0;
        }

        if (positionY < 0) {
            positionY = count - 1;
        }

        if (positionY > count - 1) {
            positionY = 0;
        }

        context.fillStyle = 'black';
        context.fillRect(0, 0, stage.clientWidth, stage.height);

        context.fillStyle = 'yellow';
        context.fillRect(targetX * length, targetY * length, length, length);

        context.fillStyle = 'lightgray';

        for (let i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * length, trail[i].y * length, length, length);     

            if (hasStarted === true) {
                if (trail[i].x === positionX && trail[i].y === positionY) {
                    speedX = 0;
                    speedY = 0;
                    
                    snakeWidth = 5;
    
                    positionX = 0;
                    positionY = 0;
                
                    if (Number(currentScore.innerHTML) > Number(topScore.innerHTML)) {
                        topScore.innerHTML = currentScore.innerHTML;
                    }
    
                    gameOver.style.display = 'block';
                        setInterval(() => {
                            gameOver.style.display = 'none';
                        }, 2000);  
    
                    currentScore.innerHTML = 0;
                    hasStarted = false;
                }
            }
        }

        trail.push({ x: positionX, y:positionY });

        while (trail.length > snakeWidth) {
            trail.shift();
        }

        if (targetX === positionX && targetY === positionY) {
            snakeWidth++;
            currentScore.innerHTML++;

            targetX = Math.floor(Math.random() * count);
            targetY = Math.floor(Math.random() * count);
        }
    }
    
    function keyPush(event) {
        switch (event.keyCode) {
            case 37: 
                speedX = -speed;
                speedY = 0;
                hasStarted = true
                break;

            case 38: 
                speedX = 0;
                speedY = -speed;
                hasStarted = true
                break;

            case 39: 
                speedX = speed;
                speedY = 0;
                hasStarted = true
                break;

            case 40: 
                speedX = 0;
                speedY = speed;
                hasStarted = true
                break;
        }
    }
}