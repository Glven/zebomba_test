import {data} from '../data/data.js';

const {friends, rating: ratingArr} = data


export function statisticInit () {
    
    const statisticOpenBtn = document.getElementById('statistic-open');
    const statisticCloseBtn = document.getElementById('statistic-close');
    const statisticWrapper = document.getElementById('statistic');
    const statisticContent = statisticWrapper.querySelector('.statistic__content');
    const statisticRating = statisticWrapper.querySelector('.statistic-list__wrapper');



    statisticOpenBtn.addEventListener('click', openStatistic);
    statisticCloseBtn.addEventListener('click', closeStatistic);
    document.addEventListener('keydown', statisticKeyDown);
    getRating(statisticRating);

    function openStatistic () {
        statisticWrapper.classList.add('active');
        statisticContent.classList.add('active');
    }

    function closeStatistic () {
        statisticWrapper.classList.remove('active');
        statisticContent.classList.remove('active');
    }

    function statisticKeyDown (e) {
        if (e.key !== 'Escape') return;
        
        closeStatistic();
    }

}

function getRating (rating) {

    const sortedRating = ratingArr
        .sort((a, b) => +b.points - +a.points);

    
    for (let i = 0; i < sortedRating.length; i++) {
        const ratingRow = createRatingRow(ratingArr[i], i);

        rating.appendChild(ratingRow);
    }

}

function createRatingRow (player, index) {
    const {
        id,
        name,
        lastName,
        points,
        img,
    } = player;

    const isFriend = friends
        .some(f => f.id === id);

    const ratingRow = document.createElement('div');
    const ratingNumber = document.createElement('p');
    const ratingImgWrapper = document.createElement('p');
    const ratingImg = document.createElement('img');
    const ratingFullname = document.createElement('p');
    const ratingPoints = document.createElement('p');

    ratingRow.classList.add('statistic-list__item', 'list-item');
    ratingRow.classList.toggle('active', isFriend);
    ratingNumber.classList.add('list-item__number');
    ratingImgWrapper.classList.add('list-item__img');

    ratingNumber.innerText = index + 1;
    ratingImg.setAttribute('alt', img);
    ratingImg.setAttribute('src', img);
    ratingFullname.innerText = name + ' ' + lastName;
    ratingPoints.innerText = points;


    ratingImgWrapper.append(ratingImg);
    

    ratingRow.append(ratingNumber);
    ratingRow.append(ratingImgWrapper);
    ratingRow.append(ratingFullname);
    ratingRow.append(ratingPoints);

    return ratingRow;
}