'use strict';

export default class Status {
    constructor() {
        this.game__startBtn = document.querySelector('.game__startBtn');
        this.game__stopBtn = document.querySelector('.game__stopBtn');
        this.game__timer = document.querySelector('.game__timer');
        this.game__count = document.querySelector('.game__count');
        this.game__startBtn.addEventListener('click', () => {
            this.onClickStart && this.onClickStart();
        });
        this.game__stopBtn.addEventListener('click', () => {
            this.onClickStop && this.onClickStop();
        });
    }

    setClickStartListener(onClickStart) {
        this.onClickStart = onClickStart;
    }

    setClickStopListener(onClickStop) {
        this.onClickStop = onClickStop;
    }

    setTimerTextContent(timer) {
        this.game__timer.textContent = `0:${timer}`;
    }

    setCountTextContent(count) {
        this.game__count.textContent = `${count}`;
    }

    setTimerColor(color) {
        this.game__timer.style.color = color;
    }

    /**
     * 버튼 display 속성 세팅
     * @param {HTMLButtonElement} btn 
     * @param {string} value 
     */
    setBtnDisplay(btn, value) {
        const theBtn = btn === 'start' ? this.game__startBtn : this.game__stopBtn;
        theBtn.style.display = value;
    }
}