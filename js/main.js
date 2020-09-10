const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div'),
    line = document.createElement('div');

const MAX_ENEMY = 7;

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

const audio = document.createElement('embed');
audio.src = '../media/audio.mp3';
audio.type = 'audio/mp3';
audio.style.cssText = ``;

car.classList.add('car');
line.classList.add('line');

const moveRoad = () => {
    const lines = document.querySelectorAll('.line');
    lines.forEach( (line) => {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
};
const moveEnemy = () => {
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach( (enemy) => {
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
                setting.start = false;
                start.classList.toggle('hide');
                start.style.top = score.offsetHeight;
            }
        enemy.y += setting.speed / 2;
        enemy.style.top = enemy.y + 'px';
        if (enemy.y >= document.documentElement.clientHeight) {
            enemy.y = -100 * setting.traffic;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
};
const getQuantityElements = (heightElement) => {
    return document.documentElement.clientHeight / heightElement + 1;
};

const playGame = () => {
    if (setting.start) {
        setting.score += setting.speed;
        score.textContent = 'Score: ' + setting.score;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight - 10)) {
            setting.y += setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
};

start.addEventListener('click', () => {
    start.classList.toggle('hide');
    gameArea.innerHTML = '';
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (100 * i) + 'px';
        line.y = 100 * i;
        gameArea.append(line);    
    }
    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        const randEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(./image/enemy${randEnemy}.png) center / cover no-repeat`;
        gameArea.append(enemy);
    }
    setting.score = 0;
    setting.start = true;
    gameArea.append(car);
    gameArea.append(audio);
    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
});

document.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.key)) {
        event.preventDefault();
        keys[event.key] = true;
    }
});
document.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.key)) {
        event.preventDefault();
        keys[event.key] = false;    
    }
});
