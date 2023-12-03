const X_class = 'x';
const O_class = 'o';
const winning_comb = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]
const restartButton = document.getElementById('restartButton')
const winningElementTextMessage = document.getElementById('massageText');
const winningMassage = document.getElementById('winningMassage')
const cellElement = document.querySelectorAll('[data-cell]');
const box = document.getElementById('box')
let O_turn;

startGame()
restartButton.addEventListener('click',startGame)

function startGame() {
    O_turn = false
    cellElement.forEach(cell => {
        cell.classList.remove(X_class)
        cell.classList.remove(O_class)
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoxHover()
    winningMassage.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = O_turn ? O_class : X_class;
    placeMark(cell, currentClass);
    if (checkWIn(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurn();
        setBoxHover();
    }
};
function isDraw() {
    return [...cellElement].every(cell =>{
        return cell.classList.contains(O_class) || 
        cell.classList.contains(X_class)
    })
}
function endGame(draw) {
    if (draw) {
        winningElementTextMessage.innerText = 'Draw'
    } else {
        if(O_turn){
            winningElementTextMessage.innerText = "O's Wins!"
        } else {
            winningElementTextMessage.innerText = "X's Wins!"
        }
    }
    winningMassage.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function checkWIn(currentClass) {
    return winning_comb.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass)
        })
    })
}

function swapTurn() {
    O_turn = !O_turn
}
function setBoxHover() {
    box.classList.remove(X_class);
    box.classList.remove(O_class);
    if (O_turn) {
        box.classList.add(O_class)
    } else {
        box.classList.add(X_class)

    }
}
