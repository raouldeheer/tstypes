import { Request, Response, Application, NextFunction } from "express";

export declare type Res = Response;
export declare type Req = Request;
export declare type Next = NextFunction;
export declare type App = Application;

export declare type voidCallback = () => void;
export declare type jsonCallback = (arg0: unknown) => void;
export declare type stringCallback = (arg0: string) => void;
export declare type numberCallback = (arg0: number) => void;
export declare type booleanCallback = (arg0: boolean) => void;
export declare type objectCallback<T> = (arg0: T) => void;

export declare type callback<T, U = unknown, V = unknown, W = unknown> = (
    arg0: T,
    arg1?: U,
    arg2?: V,
    arg3?: W
) => void;

export class Matrix {
    rows: number[][];
    factor: number;
    protected readonly type: MatrixType;
    constructor(_rows: number[][], _factor?: number, _type?: MatrixType) {
        this.factor = _factor ?? 1;
        this.type = _type ?? MatrixType.Matrix;
        if (_rows.length <= 0) throw new Error("Invalid matrix");
        const columCount = _rows[0].length;
        if (!_rows.every(v => columCount === v.length)) throw new Error("Invalid matrix");
        this.rows = _rows;
    }

    public get colums(): number[][] {
        const colums = [];
        for (let i = 0; i < this.columCount; i++) {
            colums.push(this.rows.reduce((prev: number[], curr: number[]) => [...prev, curr[i]], []));
        }
        return colums;
    }
    public get rowCount(): number {
        return this.rows.length;
    }
    public get columCount(): number {
        return this.rows[0].length;
    }
    public get T(): Matrix {
        return new Matrix(this.colums);
    }
    public get clone(): Matrix {
        return new Matrix(this.rows);
    }
    public get det(): number {
        if (this.columCount !== this.rowCount) throw new Error("Invalid oparation");
        return this.calcDet(this.rows, this.rowCount);
    }

    private calcDet(mat: number[][], n: number): number {
        if (n == 1) return mat[0][0];
        let sign = 1, result = 0;
        for (let f = 0; f < n; f++) {
            result += sign * mat[0][f] * this.calcDet(CoF(mat, f, n), n - 1);
            sign = -sign;
        }
        return result;
        function CoF(m: number[][], q: number, n: number): number[][] {
            let i = 0, j = 0;
            const t: number[][] = [];
            for (let i = 0; i < n; i++) t.push(new Array(n));
            for (let r = 1; r < n; r++) for (let c = 0; c < n; c++) {
                if (c != q) t[i][j++] = m[r][c];
                if (c != q && j == n - 1) { j = 0; i++; }
            }
            return t;
        }
    }
    protected calcRows(m: Matrix, opDir: OpDir): number[][] {
        return this.rows.map((v, i) => v.map((v2, i2) =>
            opDir === OpDir.Plus ? v2 + m.rows[i][i2] : v2 - m.rows[i][i2]));
    }

    '*'(m: Matrix): Matrix {
        if (m.rowCount !== this.columCount) throw new Error("Invalid oparation");
        const newRows = [];
        const mColums = m.colums;
        for (let i = 0; i < this.rowCount; i++) {
            const newRow = [];
            for (let j = 0; j < m.columCount; j++) {
                newRow.push(this.rows[i].reduce((prev: number, curr: number, i2: number) => prev + (mColums[j][i2] * curr), 0));
            }
            newRows.push(newRow);
        }
        return new Matrix(newRows, this.factor * m.factor);
    }
    '+'(m: Matrix): Matrix {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        return new Matrix(this.calcRows(m, OpDir.Plus), this.factor + m.factor);
    }
    '-'(m: Matrix): Matrix {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        return new Matrix(this.calcRows(m, OpDir.Min), this.factor - m.factor);
    }
}

enum OpDir {
    Plus,
    Min,
}
enum MatrixType {
    Matrix,
    Vector2,
    Vector3,
}

export class Vector2 extends Matrix {
    constructor(x: number, y: number, factor?: number) {
        super([[x], [y]], factor, MatrixType.Vector2);
    }
    '+'(m: Matrix): Vector2 {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        const newRows = this.calcRows(m, OpDir.Plus);
        return new Vector2(newRows[0][0], newRows[1][0], this.factor + m.factor);
    }
    '-'(m: Matrix): Vector2 {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        const newRows = this.calcRows(m, OpDir.Min);
        return new Vector2(newRows[0][0], newRows[1][0], this.factor - m.factor);
    }
}
export class Vector3 extends Matrix {
    constructor(x: number, y: number, z: number, factor?: number) {
        super([[x], [y], [z]], factor, MatrixType.Vector3);
    }
    '+'(m: Matrix): Vector2 {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        const newRows = this.calcRows(m, OpDir.Plus);
        return new Vector3(newRows[0][0], newRows[1][0], newRows[2][0], this.factor + m.factor);
    }
    '-'(m: Matrix): Vector2 {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        const newRows = this.calcRows(m, OpDir.Min);
        return new Vector3(newRows[0][0], newRows[1][0], newRows[2][0], this.factor - m.factor);
    }
}

const m1 = new Matrix([
    [1, 0, 3],
    [-1, 1, 2],
    [4, 2, 1]]);

const det = m1.det;
console.table(m1.rows);
console.log(det);
console.table(m1.rows);


const m11 = new Matrix([
    [1, 0, 3],
    [-1, 1, 2],
    [4, 2, 1],
    [0, 0, 1]], 2);
const m2 = new Matrix([
    [1, 0],
    [-2, 3],
    [0, 5]], 3);

const m3 = m11["*"](m2);
console.log(m3);
