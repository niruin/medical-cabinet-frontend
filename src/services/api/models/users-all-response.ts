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
import { ProfileResponseData } from './profile-response-data';

/**
 *
 * @export
 * @interface UsersAllResponse
 */
export interface UsersAllResponse {
  /**
   *
   * @type {string}
   * @memberof UsersAllResponse
   */
  status: string;
  /**
   *
   * @type {string}
   * @memberof UsersAllResponse
   */
  message: string;
  /**
   *
   * @type {Array<ProfileResponseData>}
   * @memberof UsersAllResponse
   */
  data: Array<ProfileResponseData>;
}
