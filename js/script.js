/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const promoAdv = document.querySelectorAll('.promo__adv img'),
      promoBg = document.querySelector('.promo__bg'),
      promoGenre = promoBg.querySelector('.promo__genre'),
      deleteFilms = document.querySelectorAll('.delete'),
      promoInteractiveList = document.querySelector('.promo__interactive-list'), 
      promoInteractiveItem = document.querySelectorAll('.promo__interactive-item');

// 1) Удалить все рекламные блоки со страницы (правая часть сайта)      
promoAdv.forEach(item => {
    item.remove();
});

// 2) Изменить жанр фильма, поменять "комедия" на "драма"
promoGenre.textContent = 'Драма';

// 3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img. Реализовать только при помощи JS
promoBg.style.cssText = 'background-image: url("img/bg.jpg")';

// 4) Список фильмов на странице сформировать на основании данных из этого JS файла. Отсортировать их по алфавиту
// 5) Добавить нумерацию выведенных фильмов
movieDB.movies.sort();
promoInteractiveList.innerHTML = "";
movieDB.movies.forEach((film, i) => {
    promoInteractiveList.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film} 
            <div class="delete"></div>
        </li>
    `;
    console.log(promoInteractiveList.innerHTML);
});
 
// Удаление фильмов при нажатии на корзину
deleteFilms.forEach(function(item, i) {
    item.addEventListener('click', () => {
        promoInteractiveItem.forEach(function(items, j) {
            if (i === j) {
                items.remove();
            }
        });
    });
});
