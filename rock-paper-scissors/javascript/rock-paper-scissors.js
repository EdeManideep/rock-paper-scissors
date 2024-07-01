let history = {
    myMove: [],
    computerMove: [],
    result: []
};

document.addEventListener('DOMContentLoaded', (event) => {
    loadHistory();
});

const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    ties: 0
};

updateScore();

document.getElementById('resetScoreButton').addEventListener('click', () => {
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
    clearHistory();
});

function pickComputerMove(playerMove) {
    const randomNumber = Math.random();
    let computerMove = '';
    let result = '';

    if (randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else {
        computerMove = 'scissors';
    }

    if (playerMove === computerMove) {
        result = 'Tie.';
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = 'You Win.';
    } else {
        result = 'You lose.';
    }

    if (result === 'You Win.') {
        score.wins++;
    } else if (result === 'You lose.') {
        score.loses++;
    } else {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScore();

    updateHistory(playerMove, computerMove, result);

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
        <img src="./images/${playerMove}-emoji.png" class="move-icon">
        <img src="./images/${computerMove}-emoji.png" class="move-icon">
        Computer`;

    if (result === 'You Win.') {
        win_style();
    }
}

function updateScore() {
    document.querySelector('.js-scores').innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}

function updateHistory(playerMove, computerMove, result) {
    history.myMove.push(playerMove);
    history.computerMove.push(computerMove);

    if(result === 'You Win.'){
        result = 'WIN';
    }else if(result === 'You lose.'){
        result = 'LOSE';
    }else{
        result = 'TIE';
    }
    history.result.push(result);            
    localStorage.setItem('history', JSON.stringify(history));

    const historyResults = document.getElementById('history-results');

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('history-result');
        
    const myMoveDiv = document.createElement('div');
    myMoveDiv.classList.add('myMove-container');
    myMoveDiv.innerHTML  = `<img src = "./images/${playerMove}-emoji.png" class="move-icon">`;

    const computerMoveDiv = document.createElement('div');
    computerMoveDiv.classList.add('computerMove-container');
    const computerMoveImg = document.createElement('img');
    computerMoveImg.src = `./images/${computerMove}-emoji.png`;
    computerMoveDiv.appendChild(computerMoveImg);
    computerMoveImg.classList.add('move-icon');
    
    const resultContainerDiv = document.createElement('div');
    resultContainerDiv.classList.add('result-container');
    resultContainerDiv.textContent = result;

    resultDiv.appendChild(myMoveDiv);
    resultDiv.appendChild(computerMoveDiv);
    resultDiv.appendChild(resultContainerDiv);

    historyResults.appendChild(resultDiv);
}

function loadHistory() {
    const savedHistory = JSON.parse(localStorage.getItem('history')) || {
        myMove: [],
        computerMove: [],
        result: []
    };
    history = savedHistory;

    const historyResults = document.getElementById('history-results');
    historyResults.innerHTML = '';

    for (let i = 0; i < history.myMove.length; i++) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('history-result');
            
        const myMoveDiv = document.createElement('div');
        myMoveDiv.classList.add('myMove-container');
        myMoveDiv.innerHTML  = `<img src = "./images/${history.myMove[i]}-emoji.png" class="move-icon">`;

        const computerMoveDiv = document.createElement('div');
        computerMoveDiv.classList.add('computerMove-container');
        const computerMoveImg = document.createElement('img');
        computerMoveImg.src = `./images/${history.computerMove[i]}-emoji.png`;
        computerMoveDiv.appendChild(computerMoveImg);
        computerMoveImg.classList.add('move-icon');
        
        const resultContainerDiv = document.createElement('div');
        resultContainerDiv.classList.add('result-container');
        resultContainerDiv.textContent = history.result[i];

        resultDiv.appendChild(myMoveDiv);
        resultDiv.appendChild(computerMoveDiv);
        resultDiv.appendChild(resultContainerDiv);

        historyResults.appendChild(resultDiv);
    }
}

function clearHistory() {
    history = {
        myMove: [],
        computerMove: [],
        result: []
    };
    localStorage.removeItem('history');

    const historyResults = document.getElementById('history-results');
    historyResults.innerHTML = '';
}

document.querySelector('.history-button').addEventListener('click', function(){
    const historyContainer = document.querySelector('.history-container');
    historyContainer.style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click',function(){
    const historyContainer = document.querySelector('.history-container');
    historyContainer.style.display = 'none';
});



var duration = 500;
var animationEnd = Date.now() + duration;
var skew = 1;

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function startConfetti() {
    animationEnd = Date.now() + duration;
    skew = 1;

    (function frame() {
        var timeLeft = animationEnd - Date.now();
        var ticks = Math.max(200, 500 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);

        confetti({
            particleCount: 1,
            startVelocity: 0,
            ticks: ticks,
            origin: {
                x: Math.random(),
                y: (Math.random() * skew) - 0.2
            },
            colors: ['#ffffff'],
            shapes: ['circle'],
            gravity: randomInRange(0.4, 0.6),
            scalar: randomInRange(0.4, 1),
            drift: randomInRange(-0.4, 0.4)
        });

        if (timeLeft > 0) {
            requestAnimationFrame(frame);
        }
    }());
}

document.getElementById('resetScoreButton').addEventListener('click', startConfetti);

function win_style(){
    var end = Date.now() + 200;
    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
    confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
    });
    confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
    }());
}