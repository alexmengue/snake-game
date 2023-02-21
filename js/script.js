window.onload = () => {
    let stage = document.getElementById('stage');
    let context = stage.getContext('2d');

    document.addEventListener('keydown', keyPush);

    setInterval(game, 60);

    const speed = 1;

    let speedX = 0;
    let speedY = 0;

    let positionX = 10;
    let positionY = 10;

    let length = 20;
    let count = 20;

    let targetX = 15;
    let targetY = 15;

    let trail = [];
    let tail = 5;

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

        context.fillStyle = 'red';
        context.fillRect(targetX * length, targetY * length, length, length);

        context.fillStyle = 'gray';

        for (let i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * length, trail[i].y * length, length, length);

            if (trail[i].x === positionX && trail[i].y === positionY) {
                speedX = 0;
                speedY = 0;
                tail = 5;
            }
        }

        trail.push({ x: positionX, y:positionY });

        while (trail.length > tail) {
            trail.shift();
        }

        if (targetX === positionX && targetY === positionY) {
            tail++;

            targetX = Math.floor(Math.random() * count);
            targetY = Math.floor(Math.random() * count);
        }
    }
    
    function keyPush(event) {
        switch (event.keyCode) {
            case 37: 
                speedX = -speed;
                speedY = 0;
                break;

            case 38: 
                speedX = 0;
                speedY = -speed;
                break;

            case 39: 
                speedX = speed;
                speedY = 0;
                break;

            case 40: 
                speedX = 0;
                speedY = speed;
                break;
        }
    }
}