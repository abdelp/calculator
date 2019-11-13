displayValue = "0";
lastValue = "";
operator = "";

function initializeCalc() {
    const displayValueDiv = document.getElementById("calc-input");
    displayValueDiv.innerText = this.displayValue;

    const calcButtons = document.getElementsByClassName("calc-button");

    for(let element of calcButtons) {
        const option = element.innerText;

        switch(true) {
            case element.classList.contains("number-button"):
                element.addEventListener("click", function() { setDisplayValue(option) });
                break;
            case element.classList.contains("operator-button"):
                element.addEventListener("click", function() { setOperator(option) });
                break;  
            case element.classList.contains("clean-button"):
                element.addEventListener("click", function() { cleanCharacter() });
                break;
            case element.classList.contains("clean-all-button"):
                element.addEventListener("click", function() { cleanOperations() });
                break;
            case element.classList.contains("modulus-button"):
                element.addEventListener("click", function() { modulus() });
                break;
            case element.classList.contains("operate-button"):
                element.addEventListener("click", function() { operate() });
        }
    }

    document.onkeyup = function(e) { 
        const numbersExp = new RegExp(/[0-9\.]/);
        const operatorsExp = new RegExp(/[\+\-\*\/]/);

        if(numbersExp.test(e.key)) {
            setDisplayValue(e.key);
        } else if(operatorsExp.test(e.key)) {
            let key;

            switch(e.key) {
                case "/":
                    key = "÷";
                    break;
                case "*":
                    key = "x";
            }

            setOperator(key);
        } else if(e.key =="%") {
            modulus();
        } else if(e.key == "=" || e.key == "Enter") {
            operate();
        } else if(e.key == "Backspace") {
            cleanCharacter();
        }
     }
}

function keyPressed(ev) {
    const regExp = new RegExp(/[0-9]/);
    
    if(regExp.test(Number(ev))) {
        setDisplayValue = ev;
    }
}

function add(num1, num2) {
    return Math.round((num1 + num2) * 100) / 100;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {

    if(num2 == 0) {
        return "Cannot divide by zero";
    }
    return Math.round((num1 / num2) * 100) / 100;
}

function modulus() {
    if(this.displayValue != "" && this.displayValue != "Cannot divide by zero") {
        const displayValueDiv = document.getElementById("calc-input");
        const mod = Math.round((Number(displayValueDiv.innerText) / 100) * 100) / 100;

        this.displayValue = `${mod}`;
        this.displayValue = this.displayValue.trimStart();

        displayValueDiv.innerText = this.displayValue;
    }
}

function setDisplayValue(newValue) {

    if(this.displayValue === "0" || this.displayValue == "Cannot divide by zero") {
        if(newValue == ".") {
            this.displayValue += ".";
        } else {
            this.displayValue = newValue.toString();
        }
        
    } else {
        this.displayValue += newValue.toString();
    }

    let calcInput = document.getElementById("calc-input");
    calcInput.innerText = this.displayValue;
}

function cleanOperations() {
    this.displayValue = "0";
    this.lastValue = "";

    let lastResultDiv = document.getElementById("last-result-input");
    let calcInput = document.getElementById("calc-input");

    lastResultDiv.innerText = this.lastValue;
    calcInput.innerText = this.displayValue;
}

function cleanCharacter() {
    let calcInput = document.getElementById("calc-input");
    const textLength = this.displayValue.length;

    if(textLength > 1) {
        this.displayValue = this.displayValue.slice(0, textLength - 1);
        calcInput.innerText = this.displayValue;
        
    } else {
        this.displayValue = "0";
        calcInput.innerText = this.displayValue;
    }
}

function operate() {
    if(this.lastValue != "") {
        let result;
        let lastResultDiv = document.getElementById("last-result-input");
        let displayValue = document.getElementById("calc-input");

        this.lastValue += ` ${displayValue.innerText}`;

        let calculateValues = this.lastValue.split(" ");

        for(let i = 0; i < calculateValues.length; i++) {
            if(calculateValues[i] == "x" || calculateValues[i] == "÷") {
                switch(calculateValues[i]) {
                    case "x":
                        result = multiply(Number(calculateValues[i-1]), Number(calculateValues[i+1]));
                        calculateValues.splice(i-1, 3, result);
                        i--;

                        break;
                    case "÷":
                        result = divide(Number(calculateValues[i-1]), Number(calculateValues[i+1]));
                        if(result != "Cannot divide by zero") {
                            calculateValues.splice(i-1, 3, result);
                            i--;
                        } else {
                            this.displayValue = result;

                            lastResultDiv.innerText = "";
                            this.lastValue = "";
                            displayValue.innerText = result;
                            return result;
                        }
                }
            }
        }

        for(let i = 0; i < calculateValues.length; i++) {
            if(calculateValues[i] == "+" || calculateValues[i] == "-") {
                switch(calculateValues[i]) {
                    case "+":
                        result = add(Number(calculateValues[i-1]), Number(calculateValues[i+1]));
                        calculateValues.splice(i-1, 3, result);
                        i--;

                        break;
                    case "-":
                        result = subtract(Number(calculateValues[i-1]), Number(calculateValues[i+1]));
                        calculateValues.splice(i-1, 3, result);
                    i--;
                }
            }
        }

        this.displayValue = calculateValues[0];

        lastResultDiv.innerText = "";
        this.lastValue = "";
        displayValue.innerText = result;
    }
}

function setOperator(operator) {
    let lastResultDiv = document.getElementById("last-result-input");
    let displayValueDiv = document.getElementById("calc-input");

    if((this.displayValue != "" || lastResultDiv.innerText == "") && this.displayValue != "Cannot divide by zero") {
        this.operator = operator;

        this.lastValue += ` ${this.displayValue} ${operator}`;
        this.lastValue = this.lastValue.trimStart();
        lastResultDiv.innerText = this.lastValue;
        this.displayValue = "";
        displayValueDiv.innerText = "";
    }
}

function getDisplayValue() {
    return this.displayValue;
}