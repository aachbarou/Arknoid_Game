class brick {
    constructor(x , y ){
        this.element =  document.createElement("div");
        this.element.classList.add("brick");
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        const  container = document.querySelector(".bricks");
        container.appendChild(this.element);
    }
}
class padlle {
    constructor(){
        this.element =  document.createElement("div");
        this.element.classList.add("paddle");
        const  container = document.querySelector(".game-container");
        container.appendChild(this.element);
    }
}
class ball {
    constructor(){
        this.element =  document.createElement("div");
        this.element.classList.add("ball");
        const  container = document.querySelector(".game-container");
        container.appendChild(this.element);
    }
}


// Build Bricks
var  bricks = [];
function  buildbricks(){ 
    for (let  row =  0;  row  <  3;  row++) {
        for (let  col  =  0;  col  <  13;  col++) {
            let  item =  new  brick(col * 60 , row * 30);
            bricks.push(item);
        }
    }
}

// Move Paddle 
function paddleMove() {
    let padl = new padlle(); 
    let containerWidth = document.querySelector(".game-container").offsetWidth;
    let paddleWidth = padl.element.offsetWidth;
    let speed = 0;
    let isMoving = false;

    function move() {
        if (isMoving) {
            let currentLeft = padl.element.offsetLeft;
            let newLeft = currentLeft + speed;
            if (newLeft >= 0 && newLeft + paddleWidth <= containerWidth) {
                padl.element.style.left = `${newLeft}px`;
            }
            requestAnimationFrame(move);
        }
    }
//  Add  Event Listener To Controle Padlle Movement
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            speed = -10;
            if (!isMoving) {
                isMoving = true;
                requestAnimationFrame(move);
            }
        } else if (e.key === "ArrowRight") {
            speed = 10;
            if (!isMoving) {
                isMoving = true;
                requestAnimationFrame(move);
            }
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            isMoving = false; 
        }
    });
}
//  Move The Ball
function ballMove() {
    My_ball = new ball();
    
    let dx = 4; 
    let dy = -4; 

    function updateBall() {
        let ballX = My_ball.element.offsetLeft; //  x  position of the ball
        let ballY = My_ball.element.offsetTop; //  y  position of the ball
        let gameContainer = document.querySelector(".game-container");

        My_ball.element.style.left = `${ballX + dx}px`;
        My_ball.element.style.top = `${ballY + dy}px`;
        // check  The ball  collision  with  the left and right wall
        if (ballX + dx <= 0 || ballX + dx >= gameContainer.offsetWidth - My_ball.element.offsetWidth) {
            dx = -dx; 
        }

        if (ballY + dy <= 0) {
            dy = -dy; 
        }
        if (CheckTouchbricks()) {
            dy = -dy;
        }
        // Check  the  ball  collision  with  the  paddle
        let paddle = document.querySelector(".paddle");
        if (ballY + dy >= paddle.offsetTop - My_ball.element.offsetHeight &&
            ballX >= paddle.offsetLeft &&
            ballX <= paddle.offsetLeft + paddle.offsetWidth) {
            dy = -dy; 
        }
        /// Check  The ball  collision  with  the  bottom wall
        if (ballY + dy >= gameContainer.offsetHeight) {
           
            return; 
        }

        requestAnimationFrame(updateBall); 
    }

    requestAnimationFrame(updateBall);
}
function  CheckTouchbricks(){

    for (let  i = 0;  i <  bricks.length;  i++) {
        let  currentBrick = bricks[i];
        let  ballX = My_ball.element.offsetLeft;
        let  ballY = My_ball.element.offsetTop;
        let  brickX = currentBrick.element.offsetLeft;
        let  brickY = currentBrick.element.offsetTop;
        let  brickWidth = currentBrick.element.offsetWidth;
        let  brickHeight = currentBrick.element.offsetHeight;
        // Check  the  ball  collision  with  the  brick
        if (ballX >= brickX && ballX <= brickX + brickWidth &&
            ballY >= brickY && ballY <= brickY + brickHeight) {
            currentBrick.element.remove();
            bricks.splice(i, 1);
            return true 
        }{
            continue
        }
    }
    return  false 
}
buildbricks();
paddleMove()
ballMove();