//document.querySelector('form input').oninvalid = function() { // remove mensagens de erro padrão this.setCustomValidity(""); // faz a validação novamente if (!this.validity.valid) { // se estiver inválido, coloca a mensagem this.setCustomValidity("Nome está inválido!"); } };
const shortener = document.querySelector('.shortener');
const shortenerInput = document.querySelector('.shortener input');
const shortenerButton = document.getElementById('main-button');
const shortenedLinks = document.querySelector('.shortened-links');
const linkContainer = document.querySelectorAll('.shortened-links .link-container');
const shortenedButtons = document.querySelectorAll('.shortened-links .link-container .btn-squared');

let signCreated = false;
//shortenerInput.oninvalid = setInputError;
shortenedButtons.forEach(element => {
    element.addEventListener("click", copyLink);
});

shortenerButton.addEventListener("click", () => fetchAPI)

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

function copyLink() {
    if (this.classList[0] == 'btn-squared') {
        for (let i=1; i < this.parentNode.parentNode.childNodes.length; i+= 2) {
            this.parentNode.parentNode.childNodes[i].childNodes
            [this.parentNode.parentNode.childNodes.length].classList.remove('btn-squared-active'); 
            this.parentNode.parentNode.childNodes[i].childNodes
            [this.parentNode.parentNode.childNodes.length].innerText = "Copy!";
        }
        this.classList.toggle('btn-squared-active');
        if (this.innerText == "Copy!")
        this.innerText = "Copied!";
        else 
        this.innerText = "Copy!";
    } 
    var textToCopy = this.parentNode.childNodes[5].innerText;

    var myTemporaryInputElement = document.createElement('input');
    myTemporaryInputElement.type = 'text';
    myTemporaryInputElement.value = textToCopy;
 
    document.body.appendChild(myTemporaryInputElement);
 
    myTemporaryInputElement.select();
    document.execCommand('Copy');
 
    document.body.removeChild(myTemporaryInputElement);
} 

console.log(shortenerInput.value)

function fetchAPI() {
    let x = shortenerInput.value;
    console.log(x)
    fetch(`https://api.shrtco.de/v2/shorten?url=${x}`)
    .then(res => res.json())
    .then(data => console.log(data));
}
