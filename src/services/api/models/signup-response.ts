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
import { SignupResponseData } from './signup-response-data';

/**
 *
 * @export
 * @interface SignupResponse
 */
export interface SignupResponse {
  /**
   *
   * @type {string}
   * @memberof SignupResponse
   */
  status: string;
  /**
   *
   * @type {string}
   * @memberof SignupResponse
   */
  message: string;
  /**
   *
   * @type {SignupResponseData}
   * @memberof SignupResponse
   */
  data: SignupResponseData;
}
