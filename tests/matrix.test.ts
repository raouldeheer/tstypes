import { Matrix } from "../ts";

/** matrix tests */
describe("Test Matrix", () => {
    it("Should multiply matrix", () => {
        const m1 = new Matrix(
            [1, 0, 3],
            [-1, 1, 2],
            [4, 2, 1],
            [0, 0, 1]);
        const m2 = new Matrix(
            [1, 0],
            [-2, 3],
            [0, 5]);

        const m3 = m1["*"](m2);
        const correct = new Matrix([1, 15], [-3, 13], [0, 11], [0, 5]);
        expect(m3).toStrictEqual(correct);
        expect(m1).toStrictEqual(correct);
    });
    it("Should add matrix", () => {
        const m1 = new Matrix(
            [1, 0, 3],
            [-1, 1, 2],
            [4, 2, 1]);
        const m2 = new Matrix(
            [2, 4, 0],
            [-3, 6, 0],
            [1, 7, 3]);

        const m3 = m1["+"](m2);
        const correct = new Matrix([3, 4, 3], [-4, 7, 2], [5, 9, 4]);
        expect(m3).toStrictEqual(correct);
        expect(m1).toStrictEqual(correct);
    });
    test("Should deduct matrix", () => {
        const m1 = new Matrix(
            [1, 0, 3],
            [-1, 1, 2],
            [4, 2, 1]);
        const m2 = new Matrix(
            [2, 4, 0],
            [-3, 6, 0],
            [1, 7, 3]);

        const m3 = m1["-"](m2);
        const correct = new Matrix([-1, -4, 3], [2, -5, 2], [3, -5, -2]);
        expect(m3).toStrictEqual(correct);
        expect(m1).toStrictEqual(correct);
    });
    test("Should transpone matrix", () => {
        const m1 = new Matrix(
            [1, 0, 3],
            [-1, 1, 2]);
        const m3 = m1.T;
        const correct = new Matrix([1, -1], [0, 1], [3, 2]);
        expect(m3).toStrictEqual(correct);
    });
    test("Should multiply transponed matrix", () => {
        const m1 = new Matrix([1], [0], [3]);
        const m2 = m1.T;
        const m3 = m1["*"](m2);
        const correct = new Matrix([1, 0, 3], [0, 0, 0], [3, 0, 9]);
        expect(m3).toStrictEqual(correct);
        expect(m1).toStrictEqual(correct);
    });
});
