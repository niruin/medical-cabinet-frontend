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
import { Doctor } from './doctor';

/**
 * 
 * @export
 * @interface DoctorListResponse
 */
export interface DoctorListResponse {
    /**
     * 
     * @type {string}
     * @memberof DoctorListResponse
     */
    'status': string;
    /**
     * 
     * @type {string}
     * @memberof DoctorListResponse
     */
    'message': string;
    /**
     * 
     * @type {Array<Doctor>}
     * @memberof DoctorListResponse
     */
    'data': Array<Doctor>;
}

