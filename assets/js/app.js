/* 
! 2C = TWO OF CLUBS
! 2D = TWO OF DIAMONDS
! 2H = TWO OF HEARTS
! 2S = TWO OF SPADES
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];
let puntosJugador = 0,
    puntosComputadora = 0;

// referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');



const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('strong');

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
};


const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
};

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        ((valor === 'A') ? 11 : 10)
        : valor * 1;
};

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana');
        } else if (puntosMinimos > 21) {
            alert('Computadora gana');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana');
        } else {
            alert('Computadora gana');
        };
    }, 100);
};

btnPedir.addEventListener('click', function () {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnPedir.classList.add('bg-yellow-800');
        btnDetener.disabled = true;
        btnDetener.classList.add('bg-yellow-800');
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        btnPedir.classList.add('bg-yellow-800');
        btnDetener.disabled = true;
        btnDetener.classList.add('bg-yellow-800');
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnDetener.classList.add('bg-yellow-800');
    btnPedir.disabled = true;
    btnPedir.classList.add('bg-yellow-800');
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => { 
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnPedir.classList.remove('bg-yellow-800');
    btnDetener.disabled = false;
    btnDetener.classList.remove('bg-yellow-800');

});

crearDeck();