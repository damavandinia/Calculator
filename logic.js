
var lastAction = 'clean';
var calItems = [];
var currentNumber = '';

function handleNumBtn(btnType){

    if (currentNumber.length >= 10){return;}

    if (currentNumber === '' && btnType === '.'){
        currentNumber = '0.';
    }else {
        currentNumber += btnType;
    }

    if (lastAction === 'number'){
        calItems.splice(-1);
    }

    calItems.push(currentNumber);

    lastAction = 'number';

    printResult();
}

function buttonAction(btnType){

    switch (btnType){

        case 'equal':
            currentNumber = '';
            calculate();
            return;

        case 'ac':
            calItems = [];
            currentNumber = '';
            lastAction = 'clean';

            document.getElementById("logicTxt").style.fontSize = 50+'px';
            printResult();
            return;

        case 'delete':

            if (lastAction === 'clean'){return;}

            if (lastAction === 'logic'){

                calItems.splice(-1);
                lastAction = 'number';

            }else if (lastAction === 'number'){

                const lastNum = (calItems[calItems.length - 1]).toString();
                const newNum = lastNum.substring(0, lastNum.length - 1);

                calItems.splice(-1);
                if (newNum === ''){
                    lastAction = 'logic';
                }else {
                    calItems.push(parseFloat(newNum));
                }

                currentNumber = newNum;
            }

            if (calItems.length === 0){
                lastAction = 'clean';
            }

            printResult();
            return;

        case 'percent':

            if (lastAction !== 'number'){return;}

            currentNumber = currentNumber/100;

            calItems.splice(-1);
            calItems.push(parseFloat(currentNumber));

            printResult();
            return;

    }

    if (calItems.length === 0 && lastAction === 'clean' || lastAction === 'logic'){return;}

    currentNumber = '';
    calItems.push(btnType);

    // lastAction = btnType !== 'delete' ? 'logic' : 'clean';

    lastAction = 'logic';

    printResult();
}

function calculate(){

    if (lastAction === 'logic' || lastAction === 'clean'){return;}

    const logicPhrase = getLogicPhrase();

    let result = evil(logicPhrase);

    currentNumber = result.toString();
    calItems = [currentNumber];

    document.getElementById("resultTxt").style.opacity = '1';
    document.getElementById("resultTxt").innerText = '= ' + result.toString();
    document.getElementById("resultTxt").classList.add("calResultTxt");
    document.getElementById("logicTxt").classList.remove("calResultTxt");
}

function evil(fn) {
    return new Function('return ' + fn)();
}

function getLogicPhrase(){

    let logicPhrase = '';

    for (let item of calItems){

        logicPhrase += item;
    }

    return logicPhrase;
}

function printResult(){

    document.getElementById("resultTxt").style.opacity = '0';

    let finalPhrase = getLogicPhrase().replace('/' , '÷');
    finalPhrase = finalPhrase.replace('*' , '×');

    if (finalPhrase === ''){finalPhrase = 0;}

    document.getElementById("logicTxt").innerText = finalPhrase;
    document.getElementById("logicTxt").classList.add("calResultTxt");
    document.getElementById("resultTxt").classList.remove("calResultTxt");

    let textLength = finalPhrase.length;

    if (textLength > 11){
        document.getElementById("logicTxt").style.fontSize = 50-textLength+'px';
    }
}