//document.querySelector('form input').oninvalid = function() { // remove mensagens de erro padrão this.setCustomValidity(""); // faz a validação novamente if (!this.validity.valid) { // se estiver inválido, coloca a mensagem this.setCustomValidity("Nome está inválido!"); } };
let shortener = document.querySelector('.shortener');
let shortenerInput = document.querySelector('.shortener input');
let shortenerButton = document.getElementById('main-button');
let shortenedLinks = document.querySelector('.shortened-links');
let linkContainer = document.querySelectorAll('.shortened-links .link-container');
let loadingDots = document.querySelector('.loading-dots');
//let shortenedButtons = document.querySelectorAll('.shortened-links .link-container .btn-squared');


let signCreated = false;
//shortenerInput.oninvalid = setInputError;
function shortenedRefresher() {
    let shortenedButtons = document.querySelectorAll('.shortened-links .link-container .btn-squared');
                shortenedButtons.forEach(element => {
                    element.addEventListener("click", copyLink);
                });
}

shortenedRefresher();

shortenerButton.addEventListener("click", fetchAPI)
shortenerInput.addEventListener("keydown", e => {
    if (e.keyCode == 13)
    fetchAPI();
})

function setInputError2(x) {
    let isvalidURL = validURL(x);
    if (!isvalidURL) {
        shortenerInput.setAttribute("style", "border: 2px solid var(--error); ")
        shortenerInput.classList.add('placeholder-invalid');
        if (!signCreated) {
            let inputLegend = document.createElement("p");
            inputLegend.innerText = "Please add a link";
            let btn = document.querySelector(".shortener .btn-squared")
            shortener.insertBefore(inputLegend, btn);
            signCreated = true;
        }
        return false;
    } else {
        shortenerInput.removeAttribute("style");
        shortenerInput.classList.remove('placeholder-invalid');
        if (signCreated) {
            let sign = document.querySelector('.shortener p');
            shortener.removeChild(sign);
            signCreated = false;
        }
        return true;
    }
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

/*function setInputError() {
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
}*/

function copyLink() {
    if (this.classList[0] == 'btn-squared') {
        /*for (let i = 1; i < this.parentNode.parentNode.childNodes.length; i += 2) {
            this.parentNode.parentNode.childNodes[i].childNodes
            [this.parentNode.parentNode.childNodes.length].classList.remove('btn-squared-active'); 
            console.log(this.parentNode.parentNode.childNodes[i].childNodes[shortenedLinks.length])
            this.parentNode.parentNode.childNodes[i].childNodes
            [this.parentNode.parentNode.childNodes.length].innerText = "Copy!";
        }*/
        let shortenedButtons = document.querySelectorAll('.shortened-links .link-container .btn-squared');
        shortenedButtons.forEach (element => {
            element.classList.remove('btn-squared-active');
            element.innerText = "Copy!"
        })
        /*linkContainer.forEach(element => {
            console.log(element);
            let buttons = element.querySelector('.btn-squared');
            buttons.classList.remove('btn-squared-active');
            buttons.innerText = "Copy!";
            console.log(buttons);
        });*/
        this.classList.toggle('btn-squared-active');
        if (this.innerText == "Copy!")
            this.innerText = "Copied!";
        else
            this.innerText = "Copy!";
    }
    let textToCopy = this.parentNode.childNodes[2].innerText;

    let myTemporaryInputElement = document.createElement('input');
    myTemporaryInputElement.type = 'text';
    myTemporaryInputElement.value = textToCopy;

    document.body.appendChild(myTemporaryInputElement);

    myTemporaryInputElement.select();
    document.execCommand('Copy');

    document.body.removeChild(myTemporaryInputElement);
}

function fetchAPI() {
    let x = shortenerInput.value;
    shortenerInput.value = "";
    
    if (setInputError2(x)) {
        loadingDots.setAttribute('style', 'display: block');
        fetch(`https://api.shrtco.de/v2/shorten?url=${x}`)
            .then(res => res.json())
            .then(data => {
                let newLinkContainer = document.createElement('div');
                newLinkContainer.classList.add('link-container');
                let oldLinkSpan = document.createElement('span');
                oldLinkSpan.classList.add('old-link');
                oldLinkSpan.innerText = data.result.original_link;
                let newLinkHR = document.createElement('hr');
                let newLinkSpan = document.createElement('span');
                newLinkSpan.classList.add('new-link');
                newLinkSpan.innerText = data.result.short_link;
                let copyButton = document.createElement('button');
                copyButton.classList.add('btn-squared');
                let buttonSpan = document.createElement('span');
                buttonSpan.innerText = 'Copy!';

                copyButton.appendChild(buttonSpan);
                newLinkContainer.appendChild(oldLinkSpan);
                newLinkContainer.appendChild(newLinkHR);
                newLinkContainer.appendChild(newLinkSpan);
                newLinkContainer.appendChild(copyButton);
                shortenedLinks.appendChild(newLinkContainer);                
                
                shortenedRefresher();
                loadingDots.setAttribute('style', 'display: none');
            });
        }
}