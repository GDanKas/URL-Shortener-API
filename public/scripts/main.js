//document.querySelector('form input').oninvalid = function() { // remove mensagens de erro padrão this.setCustomValidity(""); // faz a validação novamente if (!this.validity.valid) { // se estiver inválido, coloca a mensagem this.setCustomValidity("Nome está inválido!"); } };
const shortener = document.querySelector('.shortener');
const shortenerInput = document.querySelector('.shortener input');
const shortenerButton = document.querySelector('.shortener .btn-squared');
const shortenedLinks = document.querySelector('.shortened-links');
const linkContainer = document.querySelectorAll('.shortened-links .link-container');
const shortenedButtons = document.querySelectorAll('.shortened-links .link-container .btn-squared');

console.log(shortenedButtons);

let signCreated = false;
shortenerInput.oninvalid = setInputError;
shortenedButtons.forEach(element => {
    element.addEventListener("click", copyLink);
});

function setInputError() {
    this.setCustomValidity("");
    shortenerInput.value = "";
    if (!this.validity.valid) {
        this.setCustomValidity(' ');
        this.setAttribute("style", "border: 2px solid var(--error); ")
        this.classList.add('placeholder-invalid');
        if (signCreated == false) {
            let inputLegend = document.createElement("p");
            inputLegend.innerText = "Please add a link";
            let btn = document.querySelector(".shortener .btn-squared")
            shortener.insertBefore(inputLegend, btn);
            signCreated = true;
        }

    }
}

/*function copyLink() {
    let arr = this.parentNode.parentNode.childNodes
    console.log(arr)
    console.log(this.parentNode.parentNode.childNodes[5].childNodes[7])
    if (this.parentNode.childNodes[7].classList[0] === 'btn-squared') {
        this.parentNode.childNodes[7].classList.toggle('btn-squared-active');
    }
}*/

function copyLink() {
    console.log(this.parentNode.parentNode.childNodes)
    if (this.classList[0] == 'btn-squared') {
        for (let i=1; i < this.parentNode.parentNode.childNodes.length; i+= 2) {
            this.parentNode.parentNode.childNodes[i].childNodes[7].classList.remove('btn-squared-active'); 
            this.innerText = "Copy!";
        }
        this.classList.toggle('btn-squared-active');
        if (this.innerText === 'Copy!')
        this.innerText = "Copied!";
        else 
        this.innerText = "Copy!";
    } 
    console.log(this.parentNode.parentNode.childNodes);
} 