'use strict';

export default class Sound {
    constructor() {
        this.sound__bg = document.querySelector('.sound__bg');
        this.sound__alert = document.querySelector('.sound__alert');
        this.sound__bug_pull = document.querySelector('.sound__bug_pull');
        this.sound__carrot_pull = document.querySelector('.sound__carrot_pull');
        this.sound__game_win = document.querySelector('.sound__game_win');
    }

    /**
     * 사운드를 플레이하기 전에 처음으로 돌려서 재생
     * @param {HTMLAudioElement} sound 
     */
    playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }

    pauseSound(sound) {
        sound.pause();
    }

    getBg() {
        return this.sound__bg;
    }

    getAlert() {
        return this.sound__alert;
    }

    getBugPull() {
        return this.sound__bug_pull;
    }
    getCarrotPull() {
        return this.sound__carrot_pull;
    }
    getWin() {
        return this.sound__game_win;
    }
}