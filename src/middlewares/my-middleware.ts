import {Request, Response, NextFunction} from 'express';

export function myMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("Passou pelo Middleware!")

  req.user_id = "1234567890"

  return next()
}