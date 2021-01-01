import { Request, Response, Application, NextFunction } from "express";

export declare type Res = Response;
export declare type Req = Request;
export declare type Next = NextFunction;
export declare type App = Application;

export declare type voidCallback = () => void;
export declare type jsonCallback = (arg0: unknown) => void;
export declare type stringCallback = (arg0: string) => void;
export declare type numberCallback = (arg0: number) => void;

export declare type callback = (
	arg0: unknown,
	arg1?: unknown,
	arg2?: unknown,
	arg3?: unknown
) => void;