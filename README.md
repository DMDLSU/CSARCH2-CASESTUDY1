# CSARCH2-CASESTUDY1

# Machine 1: Integer Machine
**Section** S01
**Members:** 
* Cubarrubias, Dion Mel
* Encarnacion, Alessandro Gabriel
* Evangelista, Aiella
* Junsay, Andre Renee
* Rodriguez, Juan Titus


## Project Overview

This Machine has two main functions. The first function converts a user input decimal number to its binary counterpart. The user can also set the number of bits for representation, and can choose whether they wish for it to be represented as signed or unsigned binary. The Second function allows users to perform multiplication through a binary sequential multiplier, and Non-restoring division.

## The Tech Stack
*  Javascript
*  CSS
*  HTML

## Website Deployment Link

## Video Walkthrough

## Analysis Write-up

## Test Cases
### Conversion
Decimal to Unsigned Binary

| Test Case    | Input | Bits | Output                     | Expected  | P/F |
| ------------ | ----- | ---- | -------------------------- | --------- | --- |
| Normal Case  | 67    | 8    | 01000011                   | 01000011  | P   |
| Special Case | -67   | 8    | Error: Cannot be negative  | Error     | P   |
| Error Case   | 12345 | 4    | Error: Number is too large | Error     | P   |

Decimal to Signed Binary

| Test Case    | Input | Bits | Output                     | Expected  | P/F |
| ------------ | ----- | ---- | -------------------------- | --------- | --- |
| Normal Case  | 67    | 8    | 01000011                   | 01000011  | P   |
| Special Case | -67   | 8    | 10111101                   | 10111101  | P   |
| Error Case   | 12345 | 4    | Error: Number is too large | Error     | P   |

