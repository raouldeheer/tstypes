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
    protected type: string;
    constructor(..._rows: number[][]) {
        this.type = "Matrix";
        if (_rows.length <= 0) throw new Error("Invalid matrix");
        const columCount = _rows[0].length;
        if (!_rows.every(v => columCount === v.length)) throw new Error("Invalid matrix");
        this.rows = _rows;
    }

    public get colums(): number[][] {
        let colums = [];
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
        return new Matrix(...this.colums);
    }

    '*'(m: Matrix) {
        if (m.rowCount !== this.columCount) throw new Error("Invalid oparation");
        let newRows = [];
        const mColums = m.colums;
        for (let i = 0; i < this.rowCount; i++) {
            let newRow = [];
            for (let j = 0; j < m.columCount; j++) {
                newRow.push(this.rows[i].reduce((prev: number, curr: number, i2: number) => prev + (mColums[j][i2] * curr), 0));
            }
            newRows.push(newRow);
        }
        if (this.type === "Matrix") {
            this.rows = newRows;
            return this as Matrix;
        } else {
            return new Matrix(...newRows);
        }
    }
    '+'(m: Matrix) {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        this.rows = this.rows.map((v: number[], i: number) => v.map((v2: number, i2: number) => v2 + m.rows[i][i2]));
        return this;
    }
    '-'(m: Matrix) {
        if (m.rowCount !== this.rowCount || m.columCount !== this.columCount) throw new Error("Invalid oparation");
        this.rows = this.rows.map((v: number[], i: number) => v.map((v2: number, i2: number) => v2 - m.rows[i][i2]));
        return this;
    }
}

export class Vector2 extends Matrix {
    constructor(x: number, y: number) {
        super([x], [y]);
        this.type = "Vector2";
    }
}
export class Vector3 extends Matrix {
    constructor(x: number, y: number, z: number) {
        super([x], [y], [z]);
        this.type = "Vector3";
    }
}
