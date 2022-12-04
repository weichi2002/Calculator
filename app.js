let operand1 = "";
let operand2 = "";
let currentOperand = null;

const screenLast = document.querySelector(".screen-last");
const screenCurrent = document.querySelector(".screen-current");
const numButtons = document.querySelectorAll(".num");
const operandBtns = document.querySelectorAll(".operand");
const del = document.querySelector(".delete");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const dot = document.querySelector(".dot");

window.addEventListener("keydown", handleKeyboard);
clear.onclick = () => allClear();
del.onclick = () => deleteNum();
equal.onclick = () => evaluate();
dot.onclick = () => appendPoint();

operandBtns.forEach((button)=>{
    button.onclick = () => setOperation(button.textContent);
});

numButtons.forEach((button)=>{
    button.onclick = () => appendNumber(button.textContent);
});

function setOperation(operator){
    // console.log("setOperation: " + operator);
    operand1 = screenCurrent.textContent;
    currentOperand = operator;
    screenLast.textContent = `${operand1} ${currentOperand}`;
    screenCurrent.textContent = '';
}



function appendNumber(num){
    // console.log("appendNumber");
    if(screenCurrent.textContent === "0") screenCurrent.textContent = "";
    screenCurrent.textContent += num;
}

function allClear(){
    screenCurrent.textContent = '0';
    screenLast.textContent= "";
    operand1 = "";
    operand2 = "";
    currentOperand = null;
}

function handleKeyboard(e){
    // console.log("handle ", e.key);

    if(e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if(e.key === ".") appendPoint();
    if(e.key === "Enter" || e.key === "=") evaluate();
    if(e.key === "Backspace") deleteNum();
    if(e.key === "Escape") allClear();

    //operations
    if(e.key === "+") setOperation("+");
    if(e.key === "-") setOperation("-");
    if(e.key === "/") setOperation("÷");
    if(e.key === "x") setOperation("x");

}

function appendPoint() {
    // console.log("appendPoint");
    if(screenCurrent.textContent === "") 
        screenCurrent.textContent = "0";
    //already contains dot
    if(screenCurrent.textContent.includes(".")) return;
    screenCurrent.textContent += ".";
}

function deleteNum(){
    let str = screenCurrent.textContent.toString()
    str = str.substring(0, str.length-1);//delete the last char in string
    screenCurrent.textContent = str;
    if(screenCurrent.textContent === "") allClear();
}

function evaluate(){

    // console.log("evaluate");
    if(currentOperand == null) return;
    operand2 = screenCurrent.textContent;
    if(currentOperand == "÷" && operand2 === "0"){
        alert("Cannot divide by zero");
        return;
    }
    if(currentOperand != null && operand2 == ""){
        alert("Must enter a second operand");
        return;
    }

    screenCurrent.textContent = parseFloat(operate(operand1, operand2, currentOperand).toFixed(12));
    screenLast.textContent = `${operand1} ${currentOperand} ${operand2} =`;
    currentOperand = null;
}

function operate(a, b, operator){
    a = parseFloat(a);
    b = parseFloat(b);

    // console.log("operate", a, b, operator);
    switch (operator){
        case '+':
            return a + b;
        case '÷':
            return a / b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
    }
}


