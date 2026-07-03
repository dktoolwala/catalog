/**
 * Truncate Pipe
 *
 * Truncates a string to the specified maximum length.
 * Appends an ellipsis (…) when text is truncated.
 * Pure pipe — only recalculates when inputs change.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { truncate } from '../../core/utils';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 100, suffix = '…'): string {
    if (!value) {
      return '';
    }
    return truncate(value, maxLength, suffix);
  }
}
