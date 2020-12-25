// Burguer Menu Opener
const burgerBtn = document.querySelector('.menu-btn');
const navPurple = document.querySelector('.nav-purple');
burgerBtn.addEventListener('click',() => {
    burgerBtn.classList.toggle('burger-open');
    navPurple.classList.toggle('hidden');
});