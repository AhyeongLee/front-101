const topMax = 20;
const topMin = 12;
const leftMax = 36;
const leftMin = 1;
let timer=10;
let count=10;
let gameStart = false;

const game__timer = document.querySelector('.game__timer');
const game__bugs = document.querySelector('.game__bugs');
const game__carrots = document.querySelector('.game__carrots');
const resultDialog = document.querySelector('dialog');
const game__startBtn = document.querySelector('.game__startBtn');
const game__stopBtn = document.querySelector('.game__stopBtn');
const game__replayBtn = document.querySelector('.game__replayBtn');
const game__count = document.querySelector('.game__count');
const game__result = document.querySelector('.game__result');

function getRandomPosition() {
    return {
        top: 20*Math.floor(Math.random() * (Math.floor(topMax) - Math.ceil(topMin)) + Math.ceil(topMin)),
        left: 20*Math.floor(Math.random() * (Math.floor(leftMax) - Math.ceil(leftMin)) + Math.ceil(leftMin)),
    }
}

function endGame(result) {
    gameStart=false;
    resultDialog.open = true;
    game__startBtn.style.display = 'none';
    game__stopBtn.style.display = 'none';
    if (result === 'lost') {
        game__result.textContent = 'YOU LOST 😆';
    } else {
        game__result.textContent = 'YOU WIN 😉';
    }
}

function startTimer() {
    let timerId = setTimeout(function oneSecond() {
        if (!gameStart) {
            return;
        }
        game__timer.textContent = `0:${--timer}`
        if(timer === 0){
            endGame('lost');
            return;
        }
        timerId = setTimeout(oneSecond, 1000);
    }, 1000);

}

function getItemImageTag(imgSrc) {
    let zIndex;
    if (imgSrc === 'carrot') {
        zIndex=1;
    } else if (imgSrc === 'bug'){
        zIndex=2;
    } else {
        return;
    }

    const position = getRandomPosition();
    bug = document.createElement('img');
    bug.setAttribute('src', `./img/${imgSrc}.png`);
    bug.setAttribute('alt', `${imgSrc}`);
    bug.setAttribute(
        'style',
        `position: absolute; 
            top:${position.top}px; 
            left: ${position.left}px; 
            z-index:${zIndex};`
    );

    return bug;
}
function setBoards() {
    let bug;
    let carrot;
    for(let i=0; i<10; i++) {
        bug = getItemImageTag('bug');
        game__bugs.appendChild(bug);

        carrot = getItemImageTag('carrot');
        game__carrots.appendChild(carrot);
    }
}

function startGame()  {
    game__startBtn.style.display = 'none';
    game__stopBtn.style.display = 'inline';
    setBoards();
    startTimer();
}

// startGame();

game__startBtn.addEventListener('click', () => {
    gameStart=true;
    startGame();
});

game__stopBtn.addEventListener('click', () => {
    endGame('lost');
});

game__replayBtn.addEventListener('click', () => {
    timer = 10;
    count = 10;
    game__startBtn.style.display = 'inline';
    game__timer.textContent = `0:${timer}`;
    game__count.textContent = `${count}`;
    game__bugs.innerHTML = '';
    game__carrots.innerHTML = '';
    resultDialog.open = false;
    
});

function deleteItem(target) {
    game__count.textContent =`${--count}`;
    target.parentNode.removeChild(target);
    if (count === 0) {
        endGame('win');
    }
}

game__carrots.addEventListener('click', (e) => {
    if (!gameStart){
        return;
    }
    if (e.target.tagName === 'IMG') {
        deleteItem(e.target);
    }
});

game__bugs.addEventListener('click', (e) => {
    if (!gameStart) {
        return;
    }
    if (e.target.tagName === 'IMG') {
        endGame('lost');
    }
});

