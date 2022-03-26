/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
          promoInteractiveList = document.querySelector('.promo__interactive-list'), 
          addForm = document.querySelector('.add'),
          addInput = document.querySelector('.adding__input'),
          checkbox = document.querySelector('[type=checkbox]');
    
    // Удалить все рекламные блоки со страницы (правая часть сайта)      
    function deletePromotion(promotion) {
        promotion.forEach(item => {
            item.remove();
        });
    }
    deletePromotion(promoAdv);
    
    function makeChanges() {
        // Изменить жанр фильма, поменять "комедия" на "драма"
        promoGenre.textContent = 'Драма';
        // Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img. Реализовать только при помощи JS
        promoBg.style.cssText = 'background-image: url("img/bg.jpg")';
    }
    makeChanges();
    
    // Список фильмов на странице сформировать на основании данных из этого JS файла. Отсортировать их по алфавиту
    // Добавить нумерацию выведенных фильмов
    function sortFilms(arr) {
        arr.sort();
    }

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortFilms(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1}. ${film} 
                    <div class="delete"></div>
                </li>
            `;
        });

    // 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                // удаляет родительский элемент каждой кнопки delete.
                btn.parentElement.remove();
                // удаляет с базы данных методом сплайс i = индекс элемента, 1 = сколько элементов надо удалить.
                movieDB.movies.splice(i, 1);
                // рекурсия = когда функция вызывает сама себя внутри запускаясь заного (что бы не сбилась нумерацию фильмов).
                createMovieList(films, parent);
            });
        });
        
    }
    createMovieList(movieDB.movies, promoInteractiveList); 

    // 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
    // новый фильм добавляется в список. Страница не должна перезагружаться.
    // Новый фильм должен добавляться в movieDB.movies.
    // Для получения доступа к значению input - обращаемся к нему как input.value;
    // P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
    // 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
    // "Добавляем любимый фильм"
    // 5) Фильмы должны быть отсортированы по алфавиту
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
    
        let newFilms = addInput.value;
        const favorite = checkbox.checked;

        if (newFilms != false) {
            if (newFilms.length > 21) {
                newFilms = `${newFilms.substring(0, 22)}...`;
            }
            if(favorite === true) {
                alert('Добавляем любимый фильм');
            }
            movieDB.movies.push(newFilms);
            sortFilms(movieDB.movies);
            
            createMovieList(movieDB.movies, promoInteractiveList); 
        }

        e.target.reset();
    });
    
});



