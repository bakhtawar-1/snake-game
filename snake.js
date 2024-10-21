let direction = {
    x:0,
    y:0
};
let speed=7;
let score=0;
let lastPaintTime=0;
let snake=[{
    x:13,
    y:15
}];

food = {
    x:6,
    y:7
};

const eatsound = new Audio('../eat.mp3');
const gameover1 = new Audio('../gameover1.mp3');
const move = new Audio('../direction1.mp3');
const music = new Audio('../music.mp3');

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){
    for(let i=1; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        } 
    }
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
        return true;
    }
        return false;
}


function gameEngine(){
    if (isCollide(snake)) {
        gameover1.play();
        music.pause();
        direction = { x: 0, y: 0 };

        // Check if a new high score was made when the game ends
        if (score > hsval) {
            hsval = score;
            localStorage.setItem("highscore", JSON.stringify(hsval));
            highscoreBox.innerHTML = "Highscore: " + hsval;

            // Show the "New Highscore" popup after game over
            const modal = document.getElementById("newHighScoreModal");
            modal.style.display = "flex"; // Show the modal
        }

        // Reset game state
        alert("GAME OVER. Press any key to play again!");

        // Reset score and update the score display
        score = 0;
        document.getElementById("scoreBox").innerHTML = "Score: " + score;

        snake = [{ x: 13, y: 15 }];
        music.play();
    }

    // Check if the snake has eaten the food
    if (snake[0].y === food.y && snake[0].x === food.x) {
        eatsound.play();
        score += 1;

        // Update the score display
        document.getElementById("scoreBox").innerHTML = "Score: " + score;

        snake.unshift({ x: snake[0].x + direction.x, y: snake[0].y + direction.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Move the snake
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x += direction.x;
    snake[0].y += direction.y;

    // Clear and render the snake and food
    board.innerHTML = "";
    snake.forEach((e, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snk');
        }
        board.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Close modal on clicking the close button
document.getElementById('closeModal').onclick = function() {
    document.getElementById('newHighScoreModal').style.display = 'none';
};

// Close modal on any key press
window.addEventListener('keydown', function() {
    document.getElementById('newHighScoreModal').style.display = 'none';
});



let highscore = localStorage.getItem("highscore");
if(highscore===null){
    hsval=0;
    localStorage.setItem("highscore",JSON.stringify(hsval));
}
else{
    hsval=JSON.parse(highscore);
    highscoreBox.innerHTML = "Highscore" + highscore;
}

window.requestAnimationFrame(main); 
window.addEventListener('keydown',e=>{
    direction = {
        x:0,y:1
    }
    music.play();
    move.play();
    switch(e.key){
        case "ArrowUp":
            console.log("Arrowup");
            direction.x= 0;
            direction.y= -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x= 0;
            direction.y= 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x= -1;
            direction.y= 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x= 1;
            direction.y= 0;
            break;

        default:
            break;
    }
})



