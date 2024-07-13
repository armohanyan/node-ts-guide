import ErrorsUtil from './errors.util';
import HttpStatusCodesUtil  from './http-status-codes.util';
import { Request, Response, NextFunction } from 'express';  // Import types

const { ResourceNotFoundError } = ErrorsUtil;

export default class SuccessHandlerUtil {
  static handleTokenVerification(response: Response, next: NextFunction, data: unknown): void {
    this._sendResponse(response, HttpStatusCodesUtil.OK, data);
  }

  /**
   * @description Send a response.
   * @param response The Express response object.
   * @param status The HTTP status code.
   * @param data The data to include in the response body.
   */
  private static _sendResponse(response: Response, status: number, data?: unknown): void {
    // @ts-ignore
    response.status(status).json(data);
  }

  static handleList(response: Response, next: NextFunction, data: Array<any>): void {
    this._sendResponse(response, HttpStatusCodesUtil.OK, data);
  }

  static handleAdd(response: Response, next: NextFunction, data?: unknown): void {
    if (!data) {
      return this._sendResponse(response, HttpStatusCodesUtil.NO_CONTENT);
    }
    return this._sendResponse(response, HttpStatusCodesUtil.CREATED, data);
  }

  static handleGet(response: Response, next: NextFunction, data?: unknown): void {
    if (!data) {
      return next(new ResourceNotFoundError('The specified resource is not found.', HttpStatusCodesUtil.OK));
    }
    return this._sendResponse(response, HttpStatusCodesUtil.OK, data);
  }

  static handleUpdate(response: Response, next: NextFunction, data?: unknown): void {
    if (!data) {
      return this._sendResponse(response, HttpStatusCodesUtil.NO_CONTENT);
    }
    return this._sendResponse(response, HttpStatusCodesUtil.OK, data);
  }
}
