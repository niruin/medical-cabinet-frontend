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



/**
 * 
 * @export
 * @interface Schedule
 */
export interface Schedule {
    /**
     * 
     * @type {string}
     * @memberof Schedule
     */
    'event_id': string;
    /**
     * 
     * @type {string}
     * @memberof Schedule
     */
    'diagnosis': string;
    /**
     * 
     * @type {string}
     * @memberof Schedule
     */
    'comments': string;
    /**
     * 
     * @type {string}
     * @memberof Schedule
     */
    'date': string;
    /**
     * 
     * @type {object}
     * @memberof Schedule
     */
    'patient': object;
    /**
     * 
     * @type {object}
     * @memberof Schedule
     */
    'doctor': object;
}

