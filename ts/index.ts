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