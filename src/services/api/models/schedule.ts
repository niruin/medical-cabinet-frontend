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
import { SchedulePatient } from './schedule-patient';

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
  event_id: string;
  /**
   *
   * @type {string}
   * @memberof Schedule
   */
  diagnosis: string;
  /**
   *
   * @type {string}
   * @memberof Schedule
   */
  comments: string;
  /**
   *
   * @type {string}
   * @memberof Schedule
   */
  startDate: string;
  /**
   *
   * @type {string}
   * @memberof Schedule
   */
  endDate: string;
  /**
   *
   * @type {string}
   * @memberof Schedule
   */
  title: string;
  /**
   *
   * @type {SchedulePatient}
   * @memberof Schedule
   */
  patient: SchedulePatient;
  /**
   *
   * @type {SchedulePatient}
   * @memberof Schedule
   */
  doctor: SchedulePatient;
}
