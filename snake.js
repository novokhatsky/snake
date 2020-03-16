
function drawRect(param) {
    context.beginPath();
    context.rect(param.x, param.y, param.width, param.height);
    context.fillStyle = param.fillColor;
    context.fill();
}

function clearCanvas() {
    canvas.width = canvas.width;
    // альтернативный вариант очистки canvas
    //context.clearRect(0, 0, canvas.width, canvas.height);
}

function createGameMap(columns, rows) {
    const map = [];

    for (let x = 0; x < columns; ++x) {
        const row = [];

        for (let y = 0; y < rows; ++y) {
            row.push({
                x: x,
                y: y,
                snake: false,
                food: false
            });
        }

        map.push(row);
    }

    return map;
}

function getRandomFreeCell(map) {
    const freeCells = [];

    for (const cell of map.flat()) {
        if (cell.snake || cell.food) {
            continue;
        }

        freeCells.push(cell);
    }

    const index = Math.floor(Math.random() * freeCells.length);

    return freeCells[index];
}

function drawGameMap(map) {
    for (const cell of map.flat()) {
        const param = {
            x: GAME_PADDING + cell.x * (CELL_SIZE + CELL_MARGIN),
            y: GAME_PADDING + cell.y * (CELL_SIZE + CELL_MARGIN),
            width: CELL_SIZE,
            height: CELL_SIZE,
            fillColor: FREE_COLOR 
        }

        if (cell.food) {
            param.fillColor = FOOD_COLOR;
        }

        if (cell.snake) {
            param.fillColor = SNAKE_COLOR;
        }

        drawRect(param);
    }
}

function getCell(x, y) {

    if (x < 0) {
        x += COLUMNS;
    }

    if (x >=COLUMNS) {
        x -= COLUMNS;
    }

    if (y < 0) {
        y += ROWS;
    }

    if (y >= ROWS) {
        y -= ROWS;
    }

    return map[x][y];
}

function moveSnake(snake_grow = false) {

    if (!snake_grow) {
        // удаляем хвост
        snake[snake.length - 1].snake = false;
    } else {
        // змея должна вырасти
        snake.push(snake[snake.length - 1]);
        snake[snake.length - 1].snake = true;
    }

    // передвигаем тело змеи
    for (let i = snake.length - 1; i > 0; --i) {
        snake[i] = snake[i - 1];
    }

    if (snakeDirect === 'left') {
        snake[0] = getCell(snake[0].x - 1, snake[0].y);
    }

    if (snakeDirect === 'right') {
        snake[0] = getCell(snake[0].x + 1, snake[0].y);
    }

    if (snakeDirect === 'up') {
        snake[0] = getCell(snake[0].x, snake[0].y - 1);
    }

    if (snakeDirect === 'down') {
        snake[0] = getCell(snake[0].x, snake[0].y + 1);
    }

    snake[0].snake = true;
}

