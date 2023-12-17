import { AbstractControl } from '@angular/forms';

export const minArrayLength = (min: number) => {
  return (c: AbstractControl): { [key: string]: any } | null => {
    let value = c.value;
    if (value.length >= min) {
      return null;
    }
    return { minArrayLength: { valid: false } };
  };
};
