import {generatePrimes} from "./generatePrimes"

describe("generatePrimes", function () {

    it("should generate primes from 0 to 10", async () => {
        const res = await generatePrimes(0, 10)
        expect(res).toEqual([2, 3, 5, 7])
    });

    it("shouldn't generate any primes", async () => {
        const res = await generatePrimes(20, 22)
        expect(res).toEqual([])
    })
});
