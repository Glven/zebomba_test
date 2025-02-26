import {pointRoles, points} from '../data/points.js'

export function gameInit () {
    const gameBoard = document.getElementById('game');
    const univerButton = document.getElementById('univer-button');
    let characterElement;

    createPoints();
    createCharacter();

    univerButton.addEventListener('click', makeMove)

    function makeMove () {

        if (!characterElement) return;

        const characterPoint = {
            x: +characterElement.dataset.x,
            y: +characterElement.dataset.y
        };

        const pointIndex = points
            .findIndex(point => 
                point.x === characterPoint.x && point.y === characterPoint.y
            );
        
        if (pointIndex === points.length - 1) {
            alert('Вы достигли выпускного!');
            return;
        }

        const prev = points[Math.max(0, pointIndex - 1)];
        const curr = points[pointIndex];
        const next = points[pointIndex + 1];
        const nextNext = points[Math.min(points.length - 1, pointIndex + 2)];
    
        animateSpline([prev, curr, next, nextNext], () => {
            characterElement.dataset.x = next.x;
            characterElement.dataset.y = next.y;
        });
    }

    function animateSpline(controlPoints, onComplete, duration = 1000) {
        const startTime = performance.now();
    
        function interpolate(t, p0, p1, p2, p3) {
            return (
                0.5 *
                ((2 * p1) +
                    (-p0 + p2) * t +
                    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
                    (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t)
            );
        }
    
        function animate(time) {
            let t = (time - startTime) / duration;
            if (t > 1) t = 1;
    
            const x = interpolate(t, controlPoints[0].x, controlPoints[1].x, controlPoints[2].x, controlPoints[3].x);
            const y = interpolate(t, controlPoints[0].y, controlPoints[1].y, controlPoints[2].y, controlPoints[3].y);
    
            characterElement.style.left = x -6 + "px";
            characterElement.style.top = y -6 + "px";
    
            if (t < 1) {
                requestAnimationFrame(animate);
            } else if (onComplete) {
                onComplete();
            }
        }
    
        requestAnimationFrame(animate);
    }

    function createCharacter () {
        const character = document.createElement('div');
        const characterImg = document.createElement('img');
        
        const startPoint = points
            .find(point => point.role === 'start');
    
    
        characterImg.setAttribute('alt', 'character');
        characterImg.setAttribute('src', './img/woman.png');
    
        character.classList.add('game__character');
        
        character.style.top = startPoint.y + 'px';
        character.style.left = startPoint.x + 'px';
        character.dataset.x = startPoint.x;
        character.dataset.y = startPoint.y;
    
        character.appendChild(characterImg);
        gameBoard.appendChild(character);
        
        characterElement = character
    }
    
    function createPoints () {
    
        for (const point of points) {
            
            const p = document.createElement('div');
            const pImg = createPointImg(point);
    
            p.classList.add('game__point');
            p.style.top = point.y - 2 + 'px';
            p.style.left = point.x - 2 + 'px';
    
    
            p.appendChild(pImg);
    
    
            gameBoard.appendChild(p);
        } 
    
    }
    
    function createPointImg (point) {
    
        const img = document.createElement('img');
        const {role} = point;
    
        img.setAttribute('alt', `${pointRoles[role]}`);
        img.setAttribute('src', `./img/points/${pointRoles[role]}.png`);
    
        return img;
    }
    
}

export function navigationSlider() {
    const slider = document.getElementById('navigation-slider');
    const sliderWrapper = slider.querySelector('.navigation-slider__wrapper');
    const nextBtn = slider.querySelector('#navigation-slider-next');
    const prevBtn = slider.querySelector('#navigation-slider-prev');

    for (let i = 0; i < 20; i++) {
        const sliderItem = getSliderItem(i);
        sliderWrapper.appendChild(sliderItem);
    }

    const itemWidth = 50;
    const gap = 10;
    const visibleCount = 8;

    const totalItems = sliderWrapper.children.length;
    let currentIndex = 0;

    function updateSlider() {
        const offset = -(itemWidth + gap) * currentIndex;
        sliderWrapper.style.transform = `translateX(${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalItems - visibleCount) {
            currentIndex++;
            updateSlider();
        }
    });

    function getSliderItem(index) {
        const item = document.createElement('div');
        item.classList.add('navigation-slider__item');

        if (index < 6) {
            const itemImg = document.createElement('img');
            itemImg.setAttribute('alt', 'friend');
            itemImg.setAttribute('src', './img/friend.png');
            item.appendChild(itemImg);
        }

        if (index === 0) {
            const addFriendBtn = document.createElement('button');
            addFriendBtn.classList.add('navigation-slider__add-friend-btn');
            addFriendBtn.innerText = '+';
            item.appendChild(addFriendBtn);
        }

        return item;
    }
}