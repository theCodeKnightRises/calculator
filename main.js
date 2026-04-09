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

function updateCurrentNum(e) {
	let n = e.target.dataset.number;
	if (currentNum.length >= 16) return;
	total = '';
	currentNum += n;
	// if (total) total = '';
	currentNum.includes('.') ? (decimal.disabled = true) : (decimal.disabled = false);
	// console.log(currentNum, currentNum.length);
	updateMainDisplay(currentNum);
}

function updateMainDisplay(number) {
	number = Number(number).toLocaleString();
	mainDisplay.textContent = number;
	if (mainDisplay.textContent.length > 12) {
		mainDisplay.style.fontSize = '1.35rem';
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
};

for (const operator of dataOperators) {
	operator.addEventListener('click', operate);
}

let operatorSymbol = '';

function operate(e) {
	let op = e.target.dataset.operator;

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

function startAction(e) {
	let action = e.target.dataset.action;
	if (action === 'delete') {
		let currentNumCopy = currentNum.split('');
		currentNumCopy.splice(-1, 1);
		currentNum = currentNumCopy.join('');
		console.log(currentNum);
		updateMainDisplay(currentNum);
	} else if (action === 'equal') {
		if (operator === '') return;
		if (currentNum === '' && Number(currentNum) === 0) return;
		num2 = +currentNum;
		total = mathOperations[operator](num1, num2);
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

function showErrorMsg(result) {}
for (const op of dataOperators) {
	op.addEventListener('click', () => {
		console.log(op.dataset.operator);
		// console.log(typeof op.dataset.operator);
	});
}
