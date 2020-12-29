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

    pauseBg() {
        this.sound__bg.pause();
    }

    playBg() {
        this.playSound(this.sound__bg);
    }

    playAlert() {
        this.playSound(this.sound__alert);
    }

    playBugPull() {
        this.playSound(this.sound__bug_pull);
    }
    playCarrotPull() {
        this.playSound(this.sound__carrot_pull);
    }
    playWin() {
        this.playSound(this.sound__game_win);

    }
}