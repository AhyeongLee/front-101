'use strict';
import Board from './board.js';
import Status from './status.js';
import Sound from './sound.js';
import Dialog from './dialog.js';

export const Result = Object.freeze({
    win: 'win',
    lost: 'lost',
    stop: 'stop'
});

const Button = Object.freeze({
    stop: 'stop',
    start: 'start'
});

const Display = Object.freeze({
    inline: 'inline',
    none: 'none'
});

// Builder Pattern
export default class GameBuilder {
    gameTimer(timer) {
        this.gameTimer = timer;
        return this;
    }

    gameBugNum(bugNum) {
        this.gameBugNum = bugNum;
        return this;
    }

    gameCarrotNum(carrotNum) {
        this.gameCarrotNum = carrotNum;
        return this;
    }

    build() {
        return new Game(
            this.gameTimer,
            this.gameBugNum,
            this.gameCarrotNum
        );
    }
}

class Game {
    constructor(timer, bugNum, carrotNum) {
        this.timer = timer;
        this.bugNum = bugNum;
        this.carrotNum = carrotNum;
        this.isStarted = false;
        this.status = new Status();
        this.board = new Board();
        this.sound = new Sound();
        this.popup = new Dialog();

        this.status.setClickStartListener(() => {
            this.start();
        });
        this.status.setClickStopListener(() => {
            this.sound.playAlert();
            this.end(Result.stop);
        });

        this.board.setClickBugListener((e) => {
            if (!this.isStarted) {
                return;
            }
            if (e.target.tagName === 'IMG') {
                this.sound.playBugPull();
                this.end(Result.lost);
            }
        });
        this.board.setClickCarrotListener((e) => {
            if (!this.isStarted){
                return;
            }
            if (e.target.tagName === 'IMG') {
                this.sound.playCarrotPull();
                this.status.setCountTextContent(--this.countCarrot);
                this.board.deleteCarrot(e.target);
                if (this.countCarrot === 0) {
                    this.sound.playWin();
                    this.end(Result.win);
                }
            }
        });

        this.popup.setClickListener(() => {
            this.init();
        });
    }

    setEndGameListener(onGameEnd) {
        this.onGameEnd = onGameEnd;
    }

    /**
     * 게임 타이머 - 1초씩 카운트다운
     * 게임이 끝나면 멈추고
     * timer가 0이 되면 endGame('lost') 호출
     */
    countDown() {
        setTimeout(() => this.perOneSecond(), 1000);
    }
    perOneSecond = () =>{
        if (!this.isStarted) {
            return;
        }
        this.status.setTimerTextContent(--this.countTimer);
        console.log(this.countTimer);
        if(this.countTimer === 0){
            this.sound.playAlert();
            this.end(Result.lost);
            return;
        } else if (this.countTimer < 4) {
            this.status.setTimerColor('red');
        }
        setTimeout(this.perOneSecond, 1000);
    }

    /**
     * 게임 시작
     * 게임판 세팅 : setBoards()
     * 타이머 시작 : countDown()
     */
    start() {
        this.isStarted = true;
        this.status.setBtnDisplay(Button.start, Display.none);
        this.status.setBtnDisplay(Button.stop, Display.inline);
        this.board.setBoard(this.bugNum, this.carrotNum);
        this.sound.playBg();
        this.countDown();
    }

    /**
     * 게임 초기화
     */
    init() {
        this.countTimer = this.timer;
        this.countCarrot = this.carrotNum;
        this.status.setBtnDisplay(Button.start, Display.inline);
        this.status.setTimerColor('black');
        this.status.setTimerTextContent(this.timer);
        this.status.setCountTextContent(this.carrotNum);
        this.board.clearBoard();

    }

    /**
     * 게임 종료시 호출됨
     * gameEndPopup 띄워주고 결과 메시지를 보여줌
     * 
     * @param {string} result 'win' 또는 'lost'
     */
    end(result) {
        this.isStarted=false;
        this.sound.pauseBg();
        this.popup.open();
        this.status.setBtnDisplay(Button.stop, Display.none);

        this.onGameEnd && this.onGameEnd(result);
    }


}