'use strict';

import Dialog from './dialog.js';
import Status from './status.js';
import Board from './board.js';
import Sound from './sound.js';

const LEVEL = 10;

let timer;
let count;
let gameStart = false;

// game status
const gameStatus = new Status();
gameStatus.setClickStartListener(() => {
    startGame();
});
gameStatus.setClickStopListener(() => {
    endGame('stop');
});

// game board
const gameBoard = new Board();
gameBoard.setClickBugListener((e) => {
    if (!gameStart) {
        return;
    }
    if (e.target.tagName === 'IMG') {
        gameSound.playSound(gameSound.getBugPull());
        endGame('lost');
    }
});
gameBoard.setClickCarrotListener((e) => {
    if (!gameStart){
        return;
    }
    if (e.target.tagName === 'IMG') {
        gameSound.playSound(gameSound.getCarrotPull());
        gameStatus.setCountTextContent(--count);
        gameBoard.deleteCarrot(e.target);
        if (count === 0) {
            endGame('win');
        }
    }
});

// end popup
const gameEndPopup = new Dialog();
gameEndPopup.setClickListener(() => {
    setGame();
});

// game sound
const gameSound = new Sound();


/**
 * 게임 종료시 호출됨
 * gameEndPopup 띄워주고 결과 메시지를 보여줌
 * 
 * @param {string} result 'win' 또는 'lost'
 */
function endGame(result) {
    gameStart=false;
    gameSound.pauseSound(gameSound.getBg());
    gameEndPopup.open();
    gameStatus.setBtnDisplay('stop', 'none');

    let resultString;
    if (result === 'lost') {
        gameSound.playSound(gameSound.getAlert());
        resultString = 'YOU LOST 😆';
    } else if (result === 'win') {
        gameSound.playSound(gameSound.getWin());
        resultString = 'YOU WIN 😉';
    } else {
        gameSound.playSound(gameSound.getAlert());
        resultString = 'REPLAY ❓';
    }
    gameEndPopup.setResultString(resultString);
}

/**
 * 게임 타이머 - 1초씩 카운트다운
 * 게임이 끝나면 멈추고
 * timer가 0이 되면 endGame('lost') 호출
 */
function gameTimer() {
    let timerId = setTimeout(function oneSecond() {
        if (!gameStart) {
            return;
        }
        gameStatus.setTimerTextContent(--timer);
        if(timer === 0){
            endGame('lost');
            return;
        } else if (timer < 4) {
            gameStatus.setTimerColor('red');
            console.log(timer);
        }
        timerId = setTimeout(oneSecond, 1000);
    }, 1000);

}

/**
 * 게임 시작
 * 게임판 세팅 : setBoards()
 * 타이머 시작 : gameTimer()
 */
function startGame()  {
    gameStart = true;
    gameStatus.setBtnDisplay('start', 'none');
    gameStatus.setBtnDisplay('stop', 'inline');
    gameBoard.setBoard(LEVEL);

    gameSound.playSound(gameSound.getBg());
    gameTimer();
}

/**
 * 게임 초기화
 */
function setGame() {
    timer = LEVEL;
    count = LEVEL;
    gameStatus.setBtnDisplay('start', 'inline');
    gameStatus.setTimerColor('black');
    gameStatus.setTimerTextContent(timer);
    gameStatus.setCountTextContent(count);
    gameBoard.clearBoard();
}

setGame();