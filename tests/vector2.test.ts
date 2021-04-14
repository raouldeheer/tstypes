import { Matrix, Vector2 } from "../ts";

/** vector2 tests */
describe("Test Vector2", () => {
    it("Should multiply transponed vector2", () => {
        const m1 = new Vector2(2, 4);
        const m2 = m1.T;
        const m3 = m1["*"](m2);
        const correct = new Matrix([[4, 8], [8, 16]]);
        expect(m3).toStrictEqual(correct);
    });
    it("Should add vector2", () => {
        const m1 = new Vector2(2, 4);
        const m2 = new Vector2(3, -7);
        const m3 = m1["+"](m2);
        const correct = new Vector2(5, -3);
        expect(m3).toStrictEqual(correct);
    });
    test("Should deduct vector2", () => {
        const m1 = new Vector2(2, 4);
        const m2 = new Vector2(8, 3);
        const m3 = m1["-"](m2);
        const correct = new Vector2(-6, 1);
        expect(m3).toStrictEqual(correct);
    });
});
