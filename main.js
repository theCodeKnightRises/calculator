const dataNumbers = document.querySelectorAll('[data-number]');
const dataOperators = document.querySelectorAll('[data-operator]');
const dataActions = document.querySelectorAll('[data-action]');

const mainDisplay = document.querySelector('.display');
const secondDisplay = document.querySelector('.pre-display');
const decimal = document.querySelector('.decimal');

let currentNum = '';
let num1 = '';
let num2 = '';
let operator = '';
let total = '';

for (const num of dataNumbers) {
	num.addEventListener('click', updateCurrentNum);
}

// keyboard events
window.addEventListener('keydown', handleKeyboardEvents);

function handleKeyboardEvents(event) {
	// if (event.defaultPrevented) {
	// 	return;
	// }

	const keyName = event.key; // === '.' ? event.key.toString() : Number(event.key);
	// console.log(event.code);
	console.log(event.key, typeof event.key, event.code);
	switch (keyName) {
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
		case '.':
			updateCurrentNum(event, keyName);
			break;
		case '/':
		case '*':
		case '-':
		case '+':
			operate(event, keyName);
			break;
		case 'Enter':
		case 'Backspace':
		case 'Escape':
		case 'Delete':
		case '%':
			startAction(event, keyName);
			break;
	}
}
// no need to have separate function for keyboard event
// function updateCurrentNumKB(keyName) {
// 	let n = keyName;
// 	if (currentNum.length >= 16) return;
// 	total = '';
// 	currentNum += n;
// 	// if (total) total = '';
// 	currentNum.includes('.') ? (decimal.disabled = true) : (decimal.disabled = false);
// 	// console.log(currentNum, currentNum.length);
// 	updateMainDisplay(currentNum);
// }

function updateCurrentNum(event, keyName) {
	let n;
	if (event.type === 'click') {
		n = event.target.dataset.number;
	} else if (event.type === 'keydown') {
		n = keyName;
	}
	if (currentNum.length >= 16) return;
	total = '';
	currentNum += n;
	// if (total) total = '';
	currentNum.includes('.') ? (decimal.disabled = true) : (decimal.disabled = false);
	// console.log(currentNum, currentNum.length);
	updateMainDisplay(currentNum);
}

function updateMainDisplay(number) {
	number === '.' ? '.' : Number(number).toLocaleString();
	mainDisplay.textContent = number;
	if (mainDisplay.textContent.length > 12) {
		mainDisplay.style.fontSize = '1.35rem';
	} else {
		mainDisplay.style.fontSize = '2.25rem';
	}
}

const mathOperations = {
	add(n1, n2) {
		return n1 + n2;
	},
	subtract(n1, n2) {
		return n1 - n2;
	},
	multiply(n1, n2) {
		return n1 * n2;
	},
	divide(n1, n2) {
		if (n2 === 0) {
			return `Even Batman can't divide by zero.`;
		} else {
			return n1 / n2;
		}
	},
	percent(n1, n2) {
		return n1 * (n2 / 100);
	},
};

for (const operator of dataOperators) {
	operator.addEventListener('click', operate);
}

let operatorSymbol = '';

function operate(event, keyName) {
	let op;

	if (event.type === 'click') {
		op = event.target.dataset.operator;
	} else if (event.type === 'keydown') {
		if (keyName === '/') {
			op = 'divide';
		} else if (keyName === '*') {
			op = 'multiply';
		} else if (keyName === '-') {
			op = 'subtract';
		} else if (keyName === '+') {
			op = 'add';
		}
	}

	switch (op) {
		case 'add':
			operatorSymbol = '+';
			break;
		case 'subtract':
			operatorSymbol = '-';
			break;
		case 'multiply':
			operatorSymbol = 'x';
			break;
		case 'divide':
			operatorSymbol = '÷';
			break;
	}

	if (num1 === '' && num2 === '') {
		if (total === '' && currentNum === '' && Number(currentNum) === 0) return;
		num1 = total ? +total : +currentNum;
		mainDisplay.textContent = '';
		secondDisplay.textContent = `${num1} ${operatorSymbol}`;
		// operator = op;
		// currentNum = '';
		decimal.disabled = false;
		console.log('number 1 :', num1);
	} else if (num1 !== '' && num2 === '') {
		if (currentNum === '' && Number(currentNum) === 0) {
			operator = op;
			op = operator;
			secondDisplay.textContent = `${num1} ${operatorSymbol}`;
			return;
		}
		num2 = +currentNum;

		console.log('number 2', num2);
		// the operator below the one which was stored
		// by above condition when first number is stored
		num1 = mathOperations[operator](num1, num2);
		if (num1 === `Even Batman can't divide by zero.`) {
			secondDisplay.textContent = `Even Batman🦇 can't divide by zero.`;
			mainDisplay.textContent = 'You 🤡';
			num1 = '';
			// num2 = '';
			// operator = '';
			// total = '';
		} else {
			// secondDisplay.textContent = `${num1} ${operatorSymbol} ${num2} =`;
			// updateMainDisplay(total);
			mainDisplay.textContent = '';
			secondDisplay.textContent = `${num1} ${operatorSymbol}`;
		}
		num2 = '';
	}
	operator = op;
	currentNum = '';
}

for (const action of dataActions) {
	action.addEventListener('click', startAction);
}

function startAction(event, keyName) {
	let action;

	if (event.type === 'click') {
		action = event.target.dataset.action;
	} else if (event.type === 'keydown') {
		if (keyName === 'Backspace') {
			action = 'delete';
		} else if (keyName === 'Enter') {
			action = 'equal';
		} else if (keyName === 'Escape' || keyName === 'Delete') {
			action = 'clear';
		} else if (keyName === '%') {
			action = 'percent';
		}
	}
	if (action === 'delete') {
		let currentNumCopy = currentNum.split('');
		currentNumCopy.splice(-1, 1);
		currentNum = currentNumCopy.join('');
		console.log(currentNum);
		updateMainDisplay(currentNum);
	} else if (action === 'equal' || action === 'percent') {
		if (!num1) return;
		if (operator === '') return;
		if (currentNum === '' && Number(currentNum) === 0) return;
		num2 = +currentNum;
		if (action === 'equal') {
			total = mathOperations[operator](num1, num2);
		} else if (action === 'percent') {
			operator = 'percent';
			total = mathOperations[operator](num1, num2);
		}
		if (total === `Even Batman can't divide by zero.`) {
			secondDisplay.textContent = `Even Batman🦇 can't divide by zero.`;
			mainDisplay.textContent = 'You 🤡';
			// num1 = '';
			// num2 = '';
			// operator = '';
			// total = '';
		} else {
			secondDisplay.textContent = `${num1} ${operatorSymbol} ${num2} =`;
			updateMainDisplay(total);
		}
		// num1 = total;
		num1 = '';
		num2 = '';
		// operator = op;
		currentNum = '';
	} else if (action === 'clear') {
		currentNum = '';
		num1 = '';
		num2 = '';
		operator = '';
		total = '';
		updateMainDisplay(currentNum);
		secondDisplay.textContent = ``;
	}
}
