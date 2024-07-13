import http from 'http';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCodesUtil } from '../utils';

interface IError {
  name: string;
  code: string;
  message: string;
  status: number;
  data: unknown;
}

const ERROR_CASES: Record<string | number | symbol, { status: number; code: string; message?: string }> = {
  400: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]!,
  },
  ExpiredTokenConfirmError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]!,
  },
  ExpiredEmailConfirmError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]!,
  },
  InputValidationError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]!,
  },
  InvalidEmailConfirmError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]!,
  },
  SyntaxError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]!,
  },
  11000: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]!,
    message: 'Duplicate entry.',
  },
  DocumentNotFoundError: {
    status: HttpStatusCodesUtil.NOT_FOUND,
    code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND]!,
    message: 'Document Not Found.',
  },
  CastError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]!,
  },
  ValidationError: {
    status: HttpStatusCodesUtil.BAD_REQUEST,
    code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]!,
  },
  401: {
    status: HttpStatusCodesUtil.UNAUTHORIZED,
    code: http.STATUS_CODES[HttpStatusCodesUtil.UNAUTHORIZED]!,
  },
  UnauthorizedError: {
    status: HttpStatusCodesUtil.UNAUTHORIZED,
    code: http.STATUS_CODES[HttpStatusCodesUtil.UNAUTHORIZED]!,
  },
  Forbidden: {
    status: HttpStatusCodesUtil.FORBIDDEN,
    code: http.STATUS_CODES[HttpStatusCodesUtil.FORBIDDEN]!,
  },
  ForbiddenError: {
    status: HttpStatusCodesUtil.FORBIDDEN,
    code: http.STATUS_CODES[HttpStatusCodesUtil.FORBIDDEN]!,
  },
  PermissionError: {
    status: HttpStatusCodesUtil.FORBIDDEN,
    code: http.STATUS_CODES[HttpStatusCodesUtil.FORBIDDEN]!,
  },
  404: {
    status: HttpStatusCodesUtil.NOT_FOUND,
    code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND]!,
  },
  ResourceNotFoundError: {
    status: HttpStatusCodesUtil.NOT_FOUND,
    code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND]!,
  },
  ConflictError: {
    status: HttpStatusCodesUtil.CONFLICT,
    code: http.STATUS_CODES[HttpStatusCodesUtil.CONFLICT]!,
  },
  MicroserviceError: {
    status: HttpStatusCodesUtil.FAILED_DEPENDENCY,
    code: http.STATUS_CODES[HttpStatusCodesUtil.FAILED_DEPENDENCY]!,
  },
  DEFAULT: {
    status: HttpStatusCodesUtil.INTERNAL_SERVER_ERROR,
    code: http.STATUS_CODES[HttpStatusCodesUtil.INTERNAL_SERVER_ERROR]!,
    message: 'The server encountered an internal error. Try again later.',
  },
};

export default class ErrorHandlerMiddleware {
  /**
   * @param {Object} error
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next
   * @description Initialize error handler.
   */
  static init(error: IError, request: Request, response: Response, next: NextFunction) {
    const ERROR_CASE =
        ERROR_CASES[error.status as string | number | symbol] ||
        ERROR_CASES[error.code as string | number | symbol] ||
        ERROR_CASES[error.name as string | number | symbol] ||
        ERROR_CASES.DEFAULT;

    const { status, code, message } = ERROR_CASE;

    const result = {
      status,
      code,
      message: message || error.message,
      data: error.data,
    };

    if (result.status === 500) {
      console.log('Case: ', error.status, error.code, error.name, error.message);
    }
    if (result.status >= 500) console.log(error);

    response.status(result.status).json(result);
  }
}