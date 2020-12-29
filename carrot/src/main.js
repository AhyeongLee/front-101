'use strict';

import GameBuilder from './game.js';

const game = new GameBuilder()
                    .gameTimer(5)
                    .gameBugNum(5)
                    .gameCarrotNum(3)
                    .build();
game.init();