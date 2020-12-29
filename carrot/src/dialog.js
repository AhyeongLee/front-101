'use strict';

export default class Dialog {
    constructor() {
        this.game__replayBtn = document.querySelector('.game__replayBtn');
        this.resultDialog = document.querySelector('dialog');
        this.game__result = document.querySelector('.game__result');
        this.game__replayBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.resultDialog.open = false;
        });
    }
    
    setClickListener(onClick){
        this.onClick = onClick;
    }

    setResultString(resultString) {
        this.game__result.textContent = resultString;
    }

    open() {
        this.resultDialog.open = true;
    }
}