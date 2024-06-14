import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateUtil {
  constructor(private datePipe: DatePipe) {}

  formatDate(date: string | Date, format: string): string {
    return this.datePipe.transform(date, format) || '';
  }

  getCurrentDate(): string {
    const today = new Date();
    return this.datePipe.transform(today, 'yyyy-MM-dd') || '';
  }
}
