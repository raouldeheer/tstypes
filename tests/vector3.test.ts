import { Matrix, Vector3 } from "../ts";

/** vector2 tests */
describe("Test Vector2", () => {
    it("Should multiply transponed vector2", () => {
        const m1 = new Vector3(2, 4, 7);
        const m2 = m1.T;
        const m3 = m1["*"](m2);
        const correct = new Matrix([4, 8, 14], [8, 16, 28], [14, 28, 49]);
        expect(m3).toStrictEqual(correct);
    });
    it("Should add vector2", () => {
        const m1 = new Vector3(2, 4, 7);
        const m2 = new Vector3(3, -7, 7);
        const m3 = m1["+"](m2);
        const correct = new Vector3(5, -3, 14);
        expect(m3).toStrictEqual(correct);
        expect(m1).toStrictEqual(correct);
    });
    test("Should deduct vector2", () => {
        const m1 = new Vector3(2, 4, 7);
        const m2 = new Vector3(8, 3, 7);
        const m3 = m1["-"](m2);
        const correct = new Vector3(-6, 1, 0);
        expect(m3).toStrictEqual(correct);
        expect(m1).toStrictEqual(correct);
    });
});
