function unsigned(number, bits) {
    let max = (2 ** bits) -1;

    if (number < 0) {
        return "Error: Unsigned numbers cannot be negative";
    }

    if (number > max) {
        return "Error: Number is too large to fit in selected bits";
    }

    let binary = number.toString(2);

    while (binary.length < bits) {
        binary = "0" + binary;
    }

    return binary;

}

function signed(number, bits) {

    let min = -(2 ** (bits - 1));
    let max = (2 ** (bits - 1)) - 1;

       if (number < min) {
        return "Error: Number is too small to fit in selected bits";
    }

        if (number > max) {
        return "Error: Number is too large to fit in selected bits";
    }

    let binary;

    
    if (number >= 0) {
        binary = number.toString(2);
        while (binary.length < bits) {
            binary = "0" + binary;
        }

    }
    
    else {

        let value = (2 ** bits) + number;
        binary = value.toString(2);
        while (binary.length < bits) {
            binary = "0" + binary;
        }

    }

    return binary;
}