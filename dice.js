'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

const init = function () {
	score = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	current0El.textContent = 0;
	current1El.textContent = 0;
	score0El.textContent = 0;
	score1El.textContent = 0;

	diceEl.classList.add('hidden');
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	currentScore = 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
};

// Rolling dice funtionality
btnRoll.addEventListener('click', function () {
	if (playing) {
		// 1. Generate a random dice roll
		const dice = Math.trunc(Math.random() * 6) + 1;
		// Display dice
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;
		console.log(dice);

		// Check for rolled 1.
		if (dice !== 1) {
			// Add dice to currentScore
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			// Switch to next player
			// document.querySelector(`.player--${activePlayer}`).classList.add('on--1');
			if(switchPlayer){
			// document.querySelector(`.player--${activePlayer}`).classList.remove('on--1');
			}
			// player0El.classList.add('on--1');
			// player1El.classList.add('on--1');
			switchPlayer();
		}
	}
});
// Storing the score
btnHold.addEventListener('click', function () {
	if (playing) {
		// Add current score to active player's score.
		score[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			score[activePlayer];
		// Check if the score is >= 100.
		if (score[activePlayer] >= 50) {
			// Finish the game
			playing = false;
			diceEl.classList.add('hidden');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');
		} else { 
			// Switch to next player
			switchPlayer();
		}
	}
});
// Resetting the game
btnNew.addEventListener('click', init);
