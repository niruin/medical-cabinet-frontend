/* tslint:disable */
/* eslint-disable */
/**
 * Documentation
 * api documentation
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

// May contain unused imports in some cases
// @ts-ignore
import { LoginUserResponseData } from './login-user-response-data';

/**
 *
 * @export
 * @interface LoginUserResponse
 */
export interface LoginUserResponse {
  /**
   *
   * @type {string}
   * @memberof LoginUserResponse
   */
  status: string;
  /**
   *
   * @type {string}
   * @memberof LoginUserResponse
   */
  message: string;
  /**
   *
   * @type {LoginUserResponseData}
   * @memberof LoginUserResponse
   */
  data: LoginUserResponseData;
}
