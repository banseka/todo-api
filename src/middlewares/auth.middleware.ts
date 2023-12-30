import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { config } from "../config";
import { logger } from "../winston";

const whiteList = [
    { path: "/login", method: "POST" },
    { path: "/users/create", method: "POST" },
];


export async function oauthVerification(req: Request, res: Response, next: NextFunction) {
    const message = 'Bad or missing token';
    const index = whiteList.findIndex(elt => req.path.includes(elt.path) && req.method === elt.method);
    if (index !== -1) { return next(); }

    const authorization = req.headers.authorization;
    if (!authorization || authorization.split(' ').length !== 2 || authorization.split(' ')[0] !== 'Bearer') {
        return res.status(400).json({ message });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, config.get('oauthSalt'));
        next();
    } catch (error: any) {
        if (error.message === 'TokenExpired') {
            logger.error(`token expired \n${error.message}\n${error.stack}`);
            return res.status(401).json({ message: 'token expired' });
        }
        logger.error(`invalid token \n${error.message}\n${error.stack}`);
        return res.status(401).json({ message: 'invalid token' });

    }




}