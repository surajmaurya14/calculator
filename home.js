let buttonsList = document.getElementsByClassName("button");
let result = document.getElementById("result");
let history = document.getElementById("history");
let compute = document.getElementById("compute");

let operand1 = null;
let operand2 = null;
let operator = null;

function setResult(str) {
    result.innerText = " " + result.innerText + str + ",\n";
}
function setHistory(str) {
    history.innerText = str;
}

function isSpecificOperator(value) {
    if (
        value == "+" ||
        value == "-" ||
        value == "*" ||
        value == "/" ||
        value == "**" ||
        value == "^"
    ) {
        return true;
    }
    return false;
}

function inputHandler(event) {
    var value = null;
    if (event.type == "click") {
        value = this.getAttribute("data-value");
    } else {
        value = event.key;
    }
    if (value == "^") {
        value = "**";
    }
    // console.log(value);
    if (isSpecificOperator(value)) {
        if (operator != null) {
            operand2 = parseFloat(compute.textContent);
            if (!isNaN(operand2)) {
                let ans = eval(
                    "(" + operand1 + ") " + operator + " (" + operand2 + ")"
                );
                compute.innerText = ans;
                history.innerText = "";
                setResult(
                    operand1 + " " + operator + " " + operand2 + " = " + ans
                );
                operand1 = ans;
                operator = value;
                operand2 = null;
                compute.innerText = "";
            } else {
                operator = value;
            }
            history.innerText = operand1 + " " + value;
        } else {
            let val = parseFloat(compute.textContent);
            if (!isNaN(val)) {
                operand1 = val;
                operator = value;
                compute.innerText = "";
                history.innerText = operand1 + " " + value;
            } else {
                compute.innerText = "";
            }
        }
    } else if (value == "AC" || value == "Escape") {
        operand1 = null;
        operand2 = null;
        operator = null;
        result.innerText = "";
        history.innerText = "";
        compute.innerText = "";
    } else if (value == "C" || value == "Backspace") {
        let str = compute.textContent;
        if (str == "NaN" || str == "-NaN") {
            compute.innerText = "";
        } else if (str.length > 0) {
            compute.innerText = str.substr(0, str.length - 1);
        }
    } else if (value == "inverse") {
        if (operator == null) {
            let str = compute.textContent;
            operand1 = parseFloat(compute.textContent);
            if (!isNaN(operand1)) {
                let ans = 1.0 / operand1;
                operand1 = ans;
                compute.innerText = ans;
                setResult("1.0/ (" + str + ") = " + ans);
            }
        }
    } else if (value == "signChange") {
        let str = compute.textContent;
        if (str[0] == "-") {
            str = str.substr(1);
        } else {
            str = "-" + str;
        }
        compute.innerText = str;
    } else if (value == "percentage" || value == "%") {
        if (operator == null) {
            let str = compute.textContent;
            operand1 = parseFloat(str);
            if (!isNaN(operand1)) {
                let ans = operand1 / 100.0;
                operand1 = ans;
                compute.innerText = ans;
                setResult("% of (" + str + ") = " + ans);
            }
        }
    } else if (value == "sqrt") {
        if (operator == null) {
            let str = compute.textContent;
            operand1 = parseFloat(str);

            if (!isNaN(operand1)) {
                let ans = operand1 ** 0.5;
                operand1 = ans;
                compute.innerText = ans;
                setResult("√ of (" + str + ") =" + ans);
            }
        }
    } else if (value == "sqr") {
        if (operator == null) {
            let str = compute.textContent;
            operand1 = parseFloat(str);

            if (!isNaN(operand1)) {
                let ans = operand1 ** 2;
                operand1 = ans;
                compute.innerText = ans;
                setResult("Square of (" + str + ") =" + ans);
            }
        }
    } else if (value == "cube") {
        if (operator == null) {
            let str = compute.textContent;
            operand1 = parseFloat(str);

            if (!isNaN(operand1)) {
                let ans = operand1 ** 3;
                operand1 = ans;
                compute.innerText = ans;
                setResult("Cube of (" + str + ") =" + ans);
            }
        }
    } else if (value == "=" || value == "Enter") {
        if (operator != null) {
            operand2 = parseFloat(compute.textContent);
            if (!isNaN(operand2)) {
                let ans = eval(
                    "(" + operand1 + ") " + operator + " (" + operand2 + ")"
                );
                compute.innerText = ans;
                history.innerText = "";
                setResult(
                    operand1 + " " + operator + " " + operand2 + " = " + ans
                );
                operand1 = ans;
                operator = null;
                operand2 = null;
            }
        }
    } else if (value == ".") {
        if (compute.textContent.includes(".")) {
        } else {
            compute.innerText = compute.textContent + value;
        }
    } else if (
        value == "0" ||
        value == "1" ||
        value == "2" ||
        value == "3" ||
        value == "4" ||
        value == "5" ||
        value == "6" ||
        value == "7" ||
        value == "8" ||
        value == "9"
    ) {
        compute.innerText = compute.textContent + value;
    }
}
for (let i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener("click", inputHandler);
}
document.addEventListener("keydown", inputHandler);
