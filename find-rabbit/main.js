const findBtn = document.querySelector('.find');
const rabbit = document.querySelector('.rabbit');

findBtn.addEventListener('click', () => {

    rabbit.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});
