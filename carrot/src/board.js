'use strict';

/**
 * 아이템들 간격이 너무 좁아 20px씩 차이가 나게
 * 아래와 같이 min, max 값을 정의함
 */
const TOP_MAX = 20;
const TOP_MIN = 12;
const LEFT_MAX = 36;
const LEFT_MIN = 1;

export default class Board {
    constructor() {
        this.game__bugs = document.querySelector('.game__bugs');
        this.game__carrots = document.querySelector('.game__carrots');
        
        this.game__bugs.addEventListener('click', (e) => {
            this.onClickBug && this.onClickBug(e);
        });
        this.game__carrots.addEventListener('click', (e) => {
            this.onClickCarrot && this.onClickCarrot(e);
        });
    }

    setClickBugListener(onClickBug) {
        this.onClickBug = onClickBug;
    }
    
    setClickCarrotListener(onClickCarrot) {
        this.onClickCarrot = onClickCarrot;
    }

    /**
     * 게임판 세팅
     * 벌레와 당근 10개씩 랜덤한 위치에 추가
     */
    setBoard(bugNum, carrotNum) {
        let bug;
        let carrot;
        for(let i=0; i<bugNum; i++) {
            bug = getItemImageTag('bug');
            this.game__bugs.appendChild(bug);
        }
        for(let i=0; i<carrotNum; i++) {
            carrot = getItemImageTag('carrot');
            this.game__carrots.appendChild(carrot);
        }
    }
    
    clearBoard() {
        this.game__bugs.innerHTML = '';
        this.game__carrots.innerHTML = '';
    }

    /**
     * 클릭 당한 당근 삭제
     * @param {HTMLImageElement} target 
     */
    deleteCarrot(target) {
        target.parentNode.removeChild(target);
    }    

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