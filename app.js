
function switchTab(tabId) {

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });


    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });


    document.getElementById(tabId).classList.add('active');


    event.currentTarget.classList.add('active');


    document.getElementById('output').textContent = 'Output';
}


document.getElementById('opType').addEventListener('change', function (e) {
    const lbl1 = document.getElementById('lblInput1');
    const lbl2 = document.getElementById('lblInput2');

    if (e.target.value === 'multiply') {
        lbl1.textContent = 'Multiplicand';
        lbl2.textContent = 'Multiplier';
    } else {
        lbl1.textContent = 'Dividend';
        lbl2.textContent = 'Divisor';
    }
});


function runWithCapturedConsole(callback) {
    const originalConsoleLog = console.log;
    let output = '';

    console.log = function (...args) {
        output += args.join(' ') + '\n';
    };

    try {
        callback();
    } catch (e) {
        output += '\nError: ' + e.message;
    }

    console.log = originalConsoleLog;
    return output;
}

function runArithmetic() {
    const op = document.getElementById('opType').value;
    const input1 = document.getElementById('input1').value.trim();
    const input2 = document.getElementById('input2').value.trim();
    const bits = parseInt(document.getElementById('arithBits').value);
    const outputBox = document.getElementById('output');

    if (!input1 || !input2 || isNaN(bits)) {
        outputBox.textContent = 'Please fill in all fields correctly.';
        return;
    }

    const resultStr = runWithCapturedConsole(() => {
        if (op === 'multiply') {
            sequentialMultiply(input1, input2, bits);
        } else {
            nonRestoringDivide(input1, input2, bits);
        }
    });

    outputBox.textContent = resultStr || 'No output generated.';
}

function runConverter() {
    const type = document.getElementById('convType').value;
    const bits = parseInt(document.getElementById('convBits').value);
    const outputBox = document.getElementById('output');
    const inputText = document.getElementById('convInput').value.trim();
    

    if (inputText === '' || isNaN(bits)) {
    outputBox.textContent = 'Please enter a valid number and bits.';
        return;
    }
    
    let input;
    
    try {
        input = BigInt(inputText);
    }
    catch {
        outputBox.textContent = 'Please enter a valid integer.';
        return;
    }

    let result = '';
    if (type === 'unsigned') {

        result = unsigned(input, bits);
    } else {

        result = signed(input, bits);
    }

    outputBox.textContent = 'Result:\n' + result;
}
