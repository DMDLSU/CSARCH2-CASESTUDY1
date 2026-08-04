//Function for converting to unsigned binary
function unsigned(number, bits) {
    let max = (2n ** BigInt(bits)) -1n; //determines max possible bit for given number

    if (number < 0n) {
        return "Error: Unsigned numbers cannot be negative";
    }

    if (number > max) {
        return "Error: Number is too large to fit in selected bits";
    }

    let binary = number.toString(2); //converts int to binary string

    while (binary.length < bits) {
        binary = "0" + binary; //For zero padding
    }

    return binary;

}

//Function for convertin to signed binary
function signed(number, bits) {

    //Smallest and Biggest possible number that can be represented
    let min = -(2n ** BigInt(bits - 1));
    let max = (2n ** BigInt(bits - 1)) - 1n;

       if (number < min) {
        return "Error: Number is too small to fit in selected bits";
    }
        if (number > max) {
        return "Error: Number is too large to fit in selected bits";
    }

    let binary;

    
    if (number >= 0n) {
        binary = number.toString(2); 
        while (binary.length < bits) {
            binary = "0" + binary;
        }
    }
    
    else {

        //Gets 2's compement to get negative
        let value = (2n ** BigInt(bits)) + number;
        binary = value.toString(2); 
        while (binary.length < bits) {
            binary = "0" + binary;
        }

    }

    return binary;
}
