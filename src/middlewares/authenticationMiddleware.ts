import * as jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { Unauthenticated } from "../errors";
import { AUTH_TOKEN_REQUIRED } from "../constants";
import { UserTokenPayload } from "../utils/types";

export const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token;
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        if (req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
        } else {
            // Return early if no token is provided
            return next(new Unauthenticated(AUTH_TOKEN_REQUIRED));
        }
    } else {
        token = header.split(" ")[1];
    }

    try {
        // Verify the JWT token
        const decodedToken = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_KEY as string
        ) as UserTokenPayload;
        req.user = decodedToken; // Attach decoded token to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err: any) {
        // Inline function to handle errors and clear cookies
        function handleAuthError(message: string) {
            res.clearCookie("accessToken");
            return next(new Unauthenticated(message));
        }

        return handleAuthError(err.message);
    }
};
