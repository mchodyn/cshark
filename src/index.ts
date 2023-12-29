import os from "os";
import path from "path";
import { generatePrimes } from "./generatePrimes";


const min = 13;
const max = 33;
const primes: number[] = [];



const run = async () => {
    const primes = await generatePrimes(min, max);
    const message = "Prime is : " + primes.join(" ");
    console.log(message);
};
run();




