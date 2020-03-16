const COOLDOWN = 500;

const ROWS = 10;
const COLUMNS = 10;

const CELL_SIZE = 50;
const CELL_MARGIN = 1;
const GAME_PADDING = 5

const FOOD_COLOR = 'red';
const SNAKE_COLOR = 'grey';
const FREE_COLOR = 'green';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = COLUMNS * (CELL_SIZE + CELL_MARGIN) + (2 * GAME_PADDING) - CELL_MARGIN;
canvas.height = ROWS * (CELL_SIZE + CELL_MARGIN) + (2 * GAME_PADDING) - CELL_MARGIN;

let snake_grow = 0;
let game_end = false;

function loop(timestamp) {
    if (!game_end) {
        requestAnimationFrame(loop);
    } else {
        clearCanvas();
        console.log(snake.length);
        return;
    }

    if ((prevTick + COOLDOWN) <= timestamp) {
        clearCanvas();
        
        let grow = false;

        if (snake_grow > 0) {
            grow = true;
            --snake_grow;
        }

        moveSnake(grow);
        prevTick = timestamp;

        drawGameMap(map);
    }

}

const map = createGameMap(COLUMNS, ROWS);

getRandomFreeCell(map).food = true;

const snake = [getRandomFreeCell(map)]
snake[0].snake = true;

let snakeDirect = 'left';

let prevTick = 0;

drawGameMap(map);

requestAnimationFrame(loop);

document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowUp") {
        if (!(snake.length !== 1 && snakeDirect === 'down')) {
            snakeDirect = 'up';
        }
    }

    if (event.key === "ArrowDown") {
        if (!(snake.length !== 1 && snakeDirect === 'up')) {
            snakeDirect = 'down';
        }
    }

    if (event.key === "ArrowLeft") {
        if (!(snake.length !== 1 && snakeDirect === 'right')) {
            snakeDirect = 'left';
        }
    }

    if (event.key === "ArrowRight") {
        if (!(snake.length !== 1 && snakeDirect === 'left')) {
            snakeDirect = 'right';
        }
    }
});

