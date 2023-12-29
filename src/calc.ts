import {parentPort, workerData} from "worker_threads";

const size = workerData.size;
const start = workerData.start;
const limit = workerData.limit;
let currentFactor = workerData.currentFactor;
let index = 0;
const sieve = workerData.sieve;

while (currentFactor <= limit && currentFactor <= start + size) {
    if (sieve[currentFactor - 2] == 0) {
        index = start % currentFactor ? currentFactor - (start % currentFactor) : 0;

        for (index; index <= size; index += currentFactor) {
            if (start + index != currentFactor) {
                sieve[start + index - 2] = 1;
            }
        }
    }

    currentFactor += 1;

}

parentPort?.postMessage("completed");
parentPort?.close();
