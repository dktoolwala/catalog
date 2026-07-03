/**
 * Currency Format Pipe
 *
 * Wraps Angular's formatCurrency() with project-specific defaults.
 * Always formats as INR (₹) with en-IN locale.
 * Pure pipe — only recalculates when input changes.
 */

import { Pipe, type PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';

import { CURRENCY } from '../../core/constants';

@Pipe({
  name: 'currencyFormat',
  standalone: true,
  pure: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    currencyCode = CURRENCY.DEFAULT_CODE,
    _display: 'symbol' | 'code' | 'symbol-narrow' = 'symbol'
  ): string {
    if (value === null || value === undefined) {
      return '';
    }
    return formatCurrency(value, CURRENCY.LOCALE, CURRENCY.DEFAULT_SYMBOL, currencyCode);
  }
}
