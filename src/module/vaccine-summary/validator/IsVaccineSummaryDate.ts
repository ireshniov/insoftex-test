import {
  buildMessage,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { DateTime } from 'luxon';

export interface VaccineSummaryDateOptions {
  greaterThan?: string;
  greaterThanOrEqual?: string;
  isBefore?: string;
}

export enum IsVaccineSummaryDateRuleEnum {
  givenDateTimeIsValid,
  gtDateTimeIsValid,
  gt,
  gteDateTimeIsValid,
  gte,
  beforeDateTimeIsValid,
  before,
}

export function IsVaccineSummaryDate(
  options: VaccineSummaryDateOptions,
  validationOptions?: ValidationOptions,
): (object: object, propertyName: string) => void {
  let failedRule: IsVaccineSummaryDateRuleEnum;

  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: 'isVaccineSummaryDate',
      target: object.constructor,
      propertyName,
      constraints: options.isBefore ? [options.isBefore] : [],
      options: validationOptions,
      validator: {
        validate(propertyValue: any, args: ValidationArguments): boolean {
          const givenDateTime = DateTime.fromISO(propertyValue, {
            zone: 'utc',
          });

          if (!givenDateTime.isValid) {
            failedRule = IsVaccineSummaryDateRuleEnum.givenDateTimeIsValid;
            return false;
          }

          if (options.greaterThan) {
            const gtDateTime = DateTime.fromISO(options.greaterThan, {
              zone: 'utc',
            });

            if (!gtDateTime.isValid) {
              failedRule = IsVaccineSummaryDateRuleEnum.gtDateTimeIsValid;
              return false;
            }

            if (gtDateTime >= givenDateTime) {
              failedRule = IsVaccineSummaryDateRuleEnum.gt;
              return false;
            }
          }

          if (options.greaterThanOrEqual) {
            const gteDateTime = DateTime.fromISO(options.greaterThanOrEqual, {
              zone: 'utc',
            });

            if (!gteDateTime.isValid) {
              failedRule = IsVaccineSummaryDateRuleEnum.gteDateTimeIsValid;
              return false;
            }

            if (gteDateTime > givenDateTime) {
              failedRule = IsVaccineSummaryDateRuleEnum.gte;
              return false;
            }
          }

          if (options.isBefore) {
            const [beforePropertyName] = args.constraints;
            const beforeValue = args.object[beforePropertyName];

            const beforeDateTime = DateTime.fromISO(beforeValue, {
              zone: 'utc',
            });

            if (!beforeDateTime.isValid) {
              failedRule = IsVaccineSummaryDateRuleEnum.beforeDateTimeIsValid;
              return false;
            }

            if (givenDateTime >= beforeDateTime) {
              failedRule = IsVaccineSummaryDateRuleEnum.before;
              return false;
            }
          }

          return true;
        },
        defaultMessage: buildMessage((eachPrefix: string): string => {
          let message: string;

          switch (failedRule) {
            case IsVaccineSummaryDateRuleEnum.givenDateTimeIsValid:
              message = `$property is invalid ISO string.`;
              break;
            case IsVaccineSummaryDateRuleEnum.gtDateTimeIsValid:
              message = `${options.greaterThan} is invalid ISO string.`;
              break;
            case IsVaccineSummaryDateRuleEnum.gt:
              message = `$property must be greater than ${options.greaterThan}.`;
              break;
            case IsVaccineSummaryDateRuleEnum.gteDateTimeIsValid:
              message = `${options.greaterThanOrEqual} is invalid ISO string.`;
              break;
            case IsVaccineSummaryDateRuleEnum.gte:
              message = `$property must be greater than or equal to ${options.greaterThanOrEqual}.`;
              break;
            case IsVaccineSummaryDateRuleEnum.beforeDateTimeIsValid:
              message = `${options.isBefore} is invalid ISO string`;
              break;
            case IsVaccineSummaryDateRuleEnum.before:
              message = `$property must be before ${options.isBefore}`;
              break;
            default:
              message = `$property is invalid vaccine summary date`;
          }

          return `${eachPrefix}${message}`;
        }, validationOptions),
      },
    });
  };
}
