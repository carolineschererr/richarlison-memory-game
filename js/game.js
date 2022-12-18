const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const pomboCards = [
    'ble',
    'gol',
    'gol2',
    'hospital',
    'maozinha',
    'sorte',
    'vc-diria-nao',
    'venecia',
    'esqueci',
];

const pigeon = new Audio('../audio/pigeon-coo.mp3');
const galvao = new Audio('../audio/galvao.mp3');

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card'); //procurando cartas desabilitadas

    if(disabledCards.length === 18){ //quando chega em n*2, acabam as cartas e encerra o jogo
        clearInterval(this.loop);
        galvao.play();
        alert(`Parabéns, ${spanPlayer.innerHTML}! Você encontrou todos Richarlison em ${timer.innerHTML} segundos!`);
    }
}

const checkCards = () => {
    const firstPombo = firstCard.getAttribute('data-pombo');
    const secondPombo = secondCard.getAttribute('data-pombo');

    
    if(firstPombo === secondPombo) {

        pigeon.play();
        firstCard.firstChild.classList.add('disabled-card'); //desabilita par igual (css)
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = ''; //reinicia jogo
        secondCard = '';

    checkEndGame();
        
    } else {
        setTimeout(() => {
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard = '';
        secondCard = '';
        }, 500);
    }

}

const revealCard = ({ target }) => {
    
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === '') {
        target.parentNode.classList.add('reveal-card'); //mostra a carta
        firstCard = target.parentNode; //armazena na variavel firstCard
    } else if(secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (pomboCode) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${pomboCode}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-pombo', pomboCode);

    return card;
}

const loadGame = () => {

    const duplicatedPombos = [ ...pomboCards, ...pomboCards ];

    const shuffledPombos = duplicatedPombos.sort( () => Math.random() - 0.5 );

    shuffledPombos.forEach((pomboCode) => {
        const card = createCard(pomboCode);
        grid.appendChild(card);
    });

}

const startTimer = () => {

    loop = setInterval(() => {
        const currentTime = +timer.innerHTML; // metodo Number() esta aqui pq timer é uma string. precisa converter
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {

    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;

    startTimer();
    loadGame();
}
