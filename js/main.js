const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

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
    console.log('play game');
    if (setting.start) {
        requestAnimationFrame(playGame);
    };
};

start.addEventListener('click', () => {
    start.classList.toggle('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
});
document.addEventListener('keyup', (event) => {
    event.preventDefault();
    keys[event.key] = true;
 });
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    keys[event.key] = false;
    setting.start = false;
});
