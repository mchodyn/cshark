import os from "os";
import path from "path";
import {Worker} from "worker_threads";


const coreCount = os.cpus().length;
const workerPath = path.resolve(__dirname + "/calc.ts");

export const generatePrimes = async (start: number, range: number): Promise<number[]> => {
    return new Promise((resolve, reject) => {
        const area = new SharedArrayBuffer(range - 1);
        const sieve = new Int8Array(area);

        const sectionSize = Math.ceil((range - start) / coreCount);
        const sections = new Array(coreCount).fill(0).map((val, index) => [index * sectionSize + start, sectionSize]);

        const limit = Math.ceil(Math.sqrt(range));

        const workers = sections.map((section) => {
            return new Promise((resolve, reject) => {
                const worker = new Worker(workerPath, {
                    workerData: {
                        start: section[0],
                        size: section[1],
                        currentFactor: 2,
                        limit: limit,
                        sieve: sieve,
                    },
                    execArgv: /\.ts$/.test(workerPath) ? ["--require", "ts-node/register"] : undefined,
                });

                worker.on("message", resolve);
                worker.on("error", reject);
                worker.on("exit", (code: number) => {
                    if (code !== 0)
                        reject(new Error(`Worker stopped ${code}`));
                });
            });
        });

        Promise.all(workers).then((res) => {
            let counter = 2;
            const primes: number[] = [];
            sieve.forEach((elem) => {
                if (elem == 0 && counter >= start) {
                    primes.push(counter);
                }
                counter += 1;
            });


            resolve(primes);
        });
    });
};
