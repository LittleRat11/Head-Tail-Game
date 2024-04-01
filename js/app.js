const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0
};
upToDateResult();

function upToDateResult() {
    document.querySelector('.js-result').innerHTML = `Wins: ${score.wins} , Loses : ${score.loses}`;
}
document.querySelector('.js-head-btn').addEventListener('click', () => {
    playGame('heads');
})
document.querySelector('.js-tail-btn').addEventListener('click', () => {
    playGame('tails');
})

function resetScore() {
    score.wins = 0;
    score.loses = 0;
    localStorage.removeItem('score');
    upToDateResult();
}
document.querySelector('.js-reset-btn').addEventListener('click', () => {
    showResetConfirm();
})
document.querySelector('.js-auto-btn').addEventListener('click', () => {
    autoPlay();
});
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'h') {
        playGame('heads');
    } else if (event.key === 't') {
        playGame('tails');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        showResetConfirm();
    }
})

function showResetConfirm() {
    document.querySelector('.js-reset-confirmation').innerHTML =
        `
        Are you sure you want to reset the score?
    <button class=
    "js-reset-confirm-yes reset-confirm">
    Yes
    </button>
    <button class= 
    "
    js-reset-confirm-no reset-confirm
    ">
    No</button>
    `;
    document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
        resetScore();
        document.querySelector(".js-score").innerHTML = "";
        document.querySelector(".js-moves").innerHTML = "";
        hideResetConfirm();
    });
    document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
        hideResetConfirm();
    })
}

function hideResetConfirm() {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
}

let autoPlaying = false;
let intervalId;

function autoPlay() {
    if (!autoPlaying) {
        playerMove = pickComputer();
        intervalId = setInterval(() => {
            playGame(playerMove);
        }, 1000);
        autoPlaying = true;
        document.querySelector('.js-auto-btn').innerHTML = 'Stop Playing';
    } else {
        clearInterval(intervalId);
        autoPlaying = false;
        document.querySelector('.js-auto-btn').innerHTML = 'Auto Play';
    }
}

function playGame(playerChoice) {
    const result = pickComputer();
    let guess = '';
    if (playerChoice === 'tails') {
        if (result === 'tails') {
            guess = 'Win';
        } else {
            guess = 'Lose';
        }
    } else if (playerChoice === 'heads') {
        if (result === 'heads') {
            guess = 'Win';
        } else {
            guess = 'Lose';
        }
    }
    if (guess === 'Win') {
        score.wins += 1;
    } else if (guess === 'Lose') {
        score.loses += 1;
    }
    localStorage.setItem('score', JSON.stringify(score));
    upToDateResult();
    document.querySelector('.js-moves').innerHTML = `You pick  <img src="./images/${playerChoice}-emoji.png" alt="" class="game-img"> . Computer picked  <img src="./images/${result}-emoji.png" alt="" class="game-img">`;
    document.querySelector('.js-score').innerHTML = `You ${guess} `;
    //alert(`Computer pick ${result} . You picked ${playerChoice}. You ${guess} \n `);
}

function pickComputer() {
    const randomNumber = Math.random();
    let result = '';

    if (randomNumber < 0.5) {
        result = 'heads';
    } else {
        result = 'tails';
    }
    return result;
}
// *darkmode toggler

const toggleBtn = document.querySelector(".toggler");
const toggleIcon = document.querySelector("#toggleIcon");
let darkmode = localStorage.getItem("darkmode");
toggleBtn.addEventListener("click", darkmodeToggle);
if (darkmode === "enabled") {
    darkmodeOn();
}

function darkmodeToggle() {
    darkmode = localStorage.getItem("darkmode");
    if (darkmode === "enabled") {
        darkmodeOff()
    } else {
        darkmodeOn()
    }
}

function darkmodeOn() {
    document.body.classList.add("dark");
    darkmode = true;
    darkmode = localStorage.setItem("darkmode", "enabled");
    toggleIcon.className = "fa-solid fa-moon";

}

function darkmodeOff() {
    document.body.classList.remove("dark");
    darkmode = false;
    darkmode = localStorage.setItem("darkmode", "null");
    toggleIcon.className = "fa-solid fa-sun"
}