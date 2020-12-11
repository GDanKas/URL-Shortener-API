// Burguer Menu Opener
const burgerBtn = document.querySelector('.menu-btn');
const navPurple = document.querySelector('.nav-purple');
burgerBtn.addEventListener('click',() => {
    burgerBtn.classList.toggle('burger-open');
    navPurple.classList.toggle('hidden');
});

//document.querySelector('form input').oninvalid = function() { // remove mensagens de erro padrão this.setCustomValidity(""); // faz a validação novamente if (!this.validity.valid) { // se estiver inválido, coloca a mensagem this.setCustomValidity("Nome está inválido!"); } };

document.querySelector('.shortener input').oninvalid = function() { 
    this.setCustomValidity("");  
    if (!this.validity.valid) {  
        this.setCustomValidity(' '); 
        this.setAttribute("style", "border: 4px solid red;")
        this.classList.toggle('placeholder-invalid');
    } 
};