/**
 * top과 left를 아래처럼 조정하려고 했으나 아이템(벌레, 당근)들의 간격이 좁음
 *  top: 240 ~ 430px
 *  left: 10 ~ 730px
 * 
 * 그래서 20px씩 차이가 나게 하려고 아래와 같이 min, max 값을 정의함
 */
const TOP_MAX = 20;
const TOP_MIN = 12;
const LEFT_MAX = 36;
const LEFT_MIN = 1;
const LEVEL = 20;

let timer;
let count;
let gameStart = false;

// game__status
const game__startBtn = document.querySelector('.game__startBtn');
const game__stopBtn = document.querySelector('.game__stopBtn');
const game__timer = document.querySelector('.game__timer');
const game__replayBtn = document.querySelector('.game__replayBtn');
const game__count = document.querySelector('.game__count');

// game__board
const game__bugs = document.querySelector('.game__bugs');
const game__carrots = document.querySelector('.game__carrots');

// dialog
const resultDialog = document.querySelector('dialog');
const game__result = document.querySelector('.game__result');

// sound
const sound__bg = document.querySelector('.sound__bg');
const sound__alert = document.querySelector('.sound__alert');
const sound__bug_pull = document.querySelector('.sound__bug_pull');
const sound__carrot_pull = document.querySelector('.sound__carrot_pull');
const sound__game_win = document.querySelector('.sound__game_win');

/**
 * 아이템을 배치할 랜덤한 top, left를 반환
 * top: 240 ~ 400
 * left: 20 ~ 720
 * @return {object} top, left를 프로퍼티로 갖는 object를 반환
 */
function getRandomPosition() {
    return {
        top: 20 * Math.floor(Math.random() * (Math.floor(TOP_MAX) - Math.ceil(TOP_MIN)) + Math.ceil(TOP_MIN)),
        left: 20 * Math.floor(Math.random() * (Math.floor(LEFT_MAX) - Math.ceil(LEFT_MIN)) + Math.ceil(LEFT_MIN)),
    }
}

/**
 * 게임 종료시 호출됨
 * resultDialog를 띄워주고 결과 메시지를 보여줌
 * 
 * @param {string} result 'win' 또는 'lost'
 */
function endGame(result) {
    gameStart=false;
    sound__bg.pause();
    resultDialog.open = true;
    game__startBtn.style.display = 'none';
    game__stopBtn.style.display = 'none';

    if (result === 'lost') {
        playSound(sound__alert);
        game__result.textContent = 'YOU LOST 😆';
    } else if (result === 'win') {
        playSound(sound__game_win);
        game__result.textContent = 'YOU WIN 😉';
    } else {
        playSound(sound__alert);
        game__result.textContent = 'REPLAY ❓';
    }
}

/**
 * 게임 타이머 - 1초씩 카운트다운
 * 게임이 끝나면 멈추고
 * timer가 0이 되면 endGame('lost') 호출
 */
function startTimer() {
    let timerId = setTimeout(function oneSecond() {
        if (!gameStart) {
            return;
        }

        game__timer.textContent = `0:${--timer}`
        if(timer === 0){
            endGame('lost');
            return;
        } else if (timer < 4) {
            game__timer.style.color = 'red';
            console.log(timer);
        }
        timerId = setTimeout(oneSecond, 1000);
    }, 1000);

}

/**
 * 아이템(벌레, 당근)의 이미지 태그를 생성하여 리턴
 * 벌레는 항상 당근보다 위에 (z-index)
 * @param {string} imgSrc 'carrot' 또는 'bug'
 * @return {HTMLImageElement} item 
 */
function getItemImageTag(imgSrc) {
    let zIndex;
    if (imgSrc === 'carrot') {
        zIndex=1;
    } else if (imgSrc === 'bug'){
        zIndex=2;
    } else {
        return;
    }

    let item;
    const position = getRandomPosition();
    item = document.createElement('img');
    item.setAttribute('src', `./img/${imgSrc}.png`);
    item.setAttribute('alt', `${imgSrc}`);
    item.setAttribute('class', 'item')
    item.setAttribute(
        'style',
        `position: absolute; 
            top:${position.top}px; 
            left: ${position.left}px; 
            z-index:${zIndex};`
    );

    return item;
}

/**
 * 게임판 세팅
 * 벌레와 당근 10개씩 랜덤한 위치에 추가
 */
function setBoards(level) {
    let bug;
    let carrot;
    for(let i=0; i<level; i++) {
        bug = getItemImageTag('bug');
        game__bugs.appendChild(bug);
        carrot = getItemImageTag('carrot');
        game__carrots.appendChild(carrot);
    }
}

/**
 * 게임 시작
 * 게임판 세팅 : setBoards()
 * 타이머 시작 : startTimer()
 */
function startGame()  {
    game__startBtn.style.display = 'none';
    game__stopBtn.style.display = 'inline';
    playSound(sound__bg);
    setBoards(LEVEL);
    startTimer();
}

/**
 * 클릭 당한 당근 삭제
 * @param {HTMLImageElement} target 
 */
function deleteCarrot(target) {
    game__count.textContent =`${--count}`;
    target.parentNode.removeChild(target);
    if (count === 0) {
        endGame('win');
    }
}

/**
 * 게임 초기화
 */
function setGame() {
    timer = LEVEL;
    count = LEVEL;
    game__timer.style.color = 'black';
    game__startBtn.style.display = 'inline';
    game__timer.textContent = `0:${timer}`;
    game__count.textContent = `${count}`;
    game__bugs.innerHTML = '';
    game__carrots.innerHTML = '';
    resultDialog.open = false;
}

/**
 * 사운드를 플레이하기 전에 처음으로 돌려서 재생
 * @param {HTMLAudioElement} sound 
 */
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

game__startBtn.addEventListener('click', () => {
    gameStart=true;
    startGame();
    playSound(sound__bg);
});

game__stopBtn.addEventListener('click', () => {
    endGame('stop');
});

game__replayBtn.addEventListener('click', () => {
    setGame();
});

game__carrots.addEventListener('click', (e) => {
    if (!gameStart){
        return;
    }
    if (e.target.tagName === 'IMG') {
        playSound(sound__carrot_pull);
        deleteCarrot(e.target);
    }
});

game__bugs.addEventListener('click', (e) => {
    if (!gameStart) {
        return;
    }
    if (e.target.tagName === 'IMG') {
        playSound(sound__bug_pull);
        endGame('lost');
    }
});

setGame();

