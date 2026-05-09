let display = document.getElementById("display");

function appendValue(value){

    let operators = ['+', '-', '*', '/', '%'];

    let lastChar = display.value.slice(-1);

    if(operators.includes(lastChar) && operators.includes(value)){

        if(value === '-' && ['*', '/', '+', '('].includes(lastChar)){
            display.value += value;
            return;
        }

        return;
    }

    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function deleteLast(){
    display.value = display.value.slice(0, -1);
}

function calculate(){

    try{

        if(display.value.trim() === ""){
            return;
        }

        let expression = display.value;

        let result = eval(expression);

        if(isNaN(result)){
            display.value = "Error";
            return;
        }

        addToHistory(expression + " = " + result);

        display.value = result;

    }

    catch(error){

        display.value = "Error";
    }
}

function squareRoot(){

    try{

        if(display.value === "" || display.value === "Error"){
            return;
        }

        let expression = display.value;

        let result = Math.sqrt(eval(expression));

        if(isNaN(result)){
            display.value = "Error";
            return;
        }

        addToHistory("√(" + expression + ") = " + result);

        display.value = result;

    }

    catch(error){

        display.value = "Error";
    }
}

function square(){

    try{

        if(display.value === "" || display.value === "Error"){
            return;
        }

        display.value = "(" + display.value + ")**2";

    }

    catch(error){

        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event){

    let key = event.key;

    if(!isNaN(key)){
        appendValue(key);
    }

    else if(['+', '-', '*', '/', '%', '.', '(', ')'].includes(key)){

        let operators = ['+', '-', '*', '/', '%'];

        let lastChar = display.value.slice(-1);

        if(operators.includes(lastChar) && operators.includes(key)){

            if(key === '-' && ['*', '/', '+', '('].includes(lastChar)){
                appendValue(key);
                return;
            }

            return;
        }

        appendValue(key);
    }

    else if(key === "Enter"){
        event.preventDefault();
        calculate();
    }

    else if(key === "Backspace"){
        deleteLast();
    }

    else if(key === "Escape"){
        clearDisplay();
    }

});

let themeToggle = document.getElementById("theme-toggle");

themeToggle.onclick = function(){

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){
        themeToggle.innerHTML = "☀️";
    }

    else{
        themeToggle.innerHTML = "🌙";
    }

}

let historyToggle = document.getElementById("history-toggle");

let historyPanel = document.getElementById("history-panel");

historyToggle.onclick = function(){

    historyPanel.classList.toggle("active");

}

function addToHistory(text){

    let history = document.getElementById("history");

    let item = document.createElement("p");

    item.innerText = text;

    history.prepend(item);
}
let clearHistoryBtn = document.getElementById("clear-history");

clearHistoryBtn.onclick = function(){

    document.getElementById("history").innerHTML = "";

}