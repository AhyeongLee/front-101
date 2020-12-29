'use strict';

import GameBuilder, { Result } from './game.js';

const game = new GameBuilder()
                    .gameTimer(5)
                    .gameBugNum(5)
                    .gameCarrotNum(3)
                    .build();

game.setEndGameListener((result) => {
    let resultString;
    if (result === Result.lost) {
        resultString = 'YOU LOST 😆';
    } else if (result === Result.win) {
        resultString = 'YOU WIN 😉';
    } else {
        resultString = 'REPLAY ❓';
    }
    game.popup.setResultString(resultString);

});

game.init();