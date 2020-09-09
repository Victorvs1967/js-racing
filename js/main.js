const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div'),
    line = document.createElement('div');

car.classList.add('car');
line.classList.add('line');
gameArea.appendChild(line);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
const setting = {
    start: false,
    score: 0,
    speed: 3
};

const playGame = () => {
    if (setting.start) {
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
            console.log(setting.y);
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
};

start.addEventListener('click', () => {
    start.classList.toggle('hide');
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
});
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    keys[event.key] = true;
    console.log(setting.x);
});
document.addEventListener('keyup', (event) => {
    event.preventDefault();
    keys[event.key] = false;
 });
