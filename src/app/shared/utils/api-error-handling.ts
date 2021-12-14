import { HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

export interface IApiError {
  error?: IErrorResponse;
  headers?: HttpHeaders;
  status?: number;
  statusText?: string;
  url?: string;
}

export interface IErrorResponse {
  apiError: IError;
}

interface IError {
  [key: string]: string[];
  non_field_errors?: string[];
}

export function getMessageFromApiError(err: IApiError, defaultText = '', customKey = 'non_field_errors'): string {
  const error = err?.error?.apiError;
  const errorList: string[] = error ? error[customKey] : null;
  const apiText: string =  Array.isArray(errorList) ? errorList[0] : null;

  return apiText || defaultText;
}

export function setFormWithAPIError(errorMap: IError, group: FormGroup): void {
  Object.keys(errorMap).forEach((key) => {
    const control = group.get(key);

    if (!control) {
      return;
    }

    control.setErrors({ [key]: errorMap[key] });
    const sub = control.valueChanges.pipe(
      distinctUntilChanged(),
    ).subscribe(() => {
      sub.unsubscribe();
      control.updateValueAndValidity();
    });
  });
}
