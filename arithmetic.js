function toBinary(value, bits) {
    var n = BigInt(bits);
    if (value >= 0n) {
        var s = value.toString(2);
        while (s.length < bits) s = "0" + s;
        return s;
    }
    var twosComp = (1n << n) + value;
    var s = twosComp.toString(2);
    while (s.length < bits) s = "0" + s;
    return s.slice(-bits);
}

function getMinSignedBits(value) {
    if (value === 0n) return 2;
    if (value > 0n) return value.toString(2).length + 1;
    return (-value).toString(2).length + 1;
}

//Parses inputs seperately for multiplication and division to handle binary and decimal inputs
function parseOperand(inputStr, bits) {
    if (typeof inputStr !== 'string') {
        return BigInt(inputStr);
    }

    let str = inputStr.trim();

    if (str.toLowerCase().startsWith('0b')) {
        return BigInt(str);
    }

    if (/^[01]+$/.test(str)) {
        let decimalVal = BigInt(str);
        let maxUnsignedForBits = (2n ** BigInt(bits)) - 1n;

        if ((str.startsWith('0') && str.length > 1) || decimalVal > maxUnsignedForBits) {
            return BigInt("0b" + str);
        }
    }


    return BigInt(str);
}

function sequentialMultiply(multiplicandInput, multiplierInput, bits) {
    var multiplicand = parseOperand(multiplicandInput, bits);
    var multiplier = parseOperand(multiplierInput, bits);

    var n = bits;
    var nBig = BigInt(n);
    var mask = (1n << nBig) - 1n;

    var M = multiplicand & mask;
    var Q = multiplier & mask;
    var A = 0n;
    var C = 0n;

    console.log("Sequential Circuit Binary Multiplier");
    console.log("Multiplicand (M): " + multiplicand + " (" + toBinary(M, n) + ")");
    console.log("Multiplier (Q): " + multiplier + " (" + toBinary(Q, n) + ")");
    console.log("Bits: " + bits);
    console.log("");
    console.log("Cycle | Operation | C | A | Q");
    console.log("-----------------------------------------");
    console.log("Initial | Initialize | 0 | " + toBinary(A, n) + " | " + toBinary(Q, n));

    for (var i = 1; i <= n; i++) {
        var q0 = Q & 1n;

        if (q0 === 1n) {
            A = A + M;
            C = (A >> nBig) & 1n;
            A = A & mask;
            console.log(i + " | Q0=1, A=A+M | " + C + " | " + toBinary(A, n) + " | " + toBinary(Q, n));
        } else {
            console.log(i + " | Q0=0, No Add | 0 | " + toBinary(A, n) + " | " + toBinary(Q, n));
        }

        var lsbA = A & 1n;
        Q = (Q >> 1n) | (lsbA << (nBig - 1n));
        A = (A >> 1n) | (C << (nBig - 1n));
        C = 0n;

        Q = Q & mask;
        A = A & mask;

        console.log("  | Shift Right | 0 | " + toBinary(A, n) + " | " + toBinary(Q, n));
    }

    var product = (A << nBig) | Q;
    console.log("-----------------------------------------");
    console.log("Final Product (Binary): " + toBinary(A, n) + " " + toBinary(Q, n));
    console.log("Final Product (Decimal): " + product.toString());
    console.log("\n");
}

function nonRestoringDivide(dividendInput, divisorInput, bits) {
    var dividend = parseOperand(dividendInput, bits);
    var divisor = parseOperand(divisorInput, bits);

    if (divisor === 0n) {
        console.log("Error: Division by zero");
        return;
    }

    var n = bits;
    var nBig = BigInt(n);
    var maskQ = (1n << nBig) - 1n;

    var Q = dividend & maskQ;
    var M = divisor;
    var A = 0n;

    var rawSteps = [];
    rawSteps.push({ cycle: "Initial", op: "Initialize", A: A, Q: Q });

    for (var i = 1; i <= n; i++) {
        var msbQ = (Q >> (nBig - 1n)) & 1n;
        A = (A << 1n) | msbQ;
        Q = (Q << 1n) & maskQ;

        rawSteps.push({ cycle: i.toString(), op: "Shift Left", A: A, Q: Q });

        var op;
        if (A >= 0n) {
            A = A - M;
            op = "A>=0, A=A-M";
        } else {
            A = A + M;
            op = "A<0, A=A+M";
        }

        if (A >= 0n) {
            Q = Q | 1n;
            op += ", Q0=1";
        } else {
            op += ", Q0=0";
        }

        rawSteps.push({ cycle: " ", op: op, A: A, Q: Q });
    }

    if (A < 0n) {
        A = A + M;
        rawSteps.push({ cycle: " ", op: "Restore: A=A+M", A: A, Q: Q });
    }

    var maxABits = n + 1;
    for (var j = 0; j < rawSteps.length; j++) {
        var needed = getMinSignedBits(rawSteps[j].A);
        if (needed > maxABits) maxABits = needed;
    }

    console.log("Non-Restoring Division");
    console.log("Dividend (Q): " + dividend + " (" + toBinary(dividend & maskQ, n) + ")");
    console.log("Divisor (M): " + divisor + " (" + toBinary(M, n) + ")");
    console.log("Bits: " + bits);
    console.log("");
    console.log("Cycle | Operation | A | Q");
    console.log("-----------------------------------------");
    
    for (var k = 0; k < rawSteps.length; k++) {
        var s = rawSteps[k];
        console.log(s.cycle + " | " + s.op + " | " + toBinary(s.A, maxABits) + " | " + toBinary(s.Q, n));
    }

    console.log("-----------------------------------------");
    console.log("Final Quotient (Binary): " + toBinary(Q, n));
    console.log("Final Quotient (Decimal): " + Q.toString());
    console.log("Final Remainder (Binary): " + toBinary(A, n));
    console.log("Final Remainder (Decimal): " + A.toString());
    console.log("\n");
}
