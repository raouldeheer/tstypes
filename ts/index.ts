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
        return new Matrix(newRows);
    }
    '+'(m: Matrix): Matrix {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        return new Matrix(this.calcRows(m, OpDir.Plus));
    }
    '-'(m: Matrix): Matrix {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        return new Matrix(this.calcRows(m, OpDir.Min));
    }
}

enum OpDir {
    Plus = 1,
    Min = -1,
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
        return new Vector2(newRows[0][0], newRows[1][0]);
    }
    '-'(m: Matrix): Vector2 {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        const newRows = this.calcRows(m, OpDir.Min);
        return new Vector2(newRows[0][0], newRows[1][0]);
    }
}
export class Vector3 extends Matrix {
    constructor(x: number, y: number, z: number, factor?: number) {
        super([[x], [y], [z]], factor, MatrixType.Vector3);
    }
    '+'(m: Matrix): Vector2 {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        const newRows = this.calcRows(m, OpDir.Plus);
        return new Vector3(newRows[0][0], newRows[1][0], newRows[2][0]);
    }
    '-'(m: Matrix): Vector2 {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        const newRows = this.calcRows(m, OpDir.Min);
        return new Vector3(newRows[0][0], newRows[1][0], newRows[2][0]);
    }
}
