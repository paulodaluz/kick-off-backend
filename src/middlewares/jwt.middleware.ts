import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ErrorUtils } from '../utils/error.utils';
const jwt = require('jsonwebtoken');

export function JWTValidation(req: Request, res: Response, next: NextFunction) {
  try {
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY_TO_JWT_TOKEN);
  } catch(err) {
    Logger.error(`ERROR = ${err.message}`, `MIDDLEWARE - JWTValidation`);

    ErrorUtils.throwSpecificError(403);
  }
  next();
};
