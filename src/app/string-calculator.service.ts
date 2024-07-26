import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringCalculatorService {

  constructor() { }

  add(numbers: string): number {
    if (!numbers) return 0;

    let delimiters = [',', '\n'];
    let customDelimiter = false;

    if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      const delimiterSection = numbers.substring(2, delimiterEndIndex);

      if (delimiterSection.startsWith('[') && delimiterSection.endsWith(']')) {
        const multiDelimiters = delimiterSection.match(/\[(.*?)\]/g)?.map(d => d.slice(1, -1)) || [];
        delimiters = delimiters.concat(multiDelimiters);
      } else {
        delimiters.push(delimiterSection);
      }

      numbers = numbers.substring(delimiterEndIndex + 1);
    }

    const delimitersRegex = new RegExp(`[${delimiters.map(d => this.escapeRegExp(d)).join('')}]`);
    const numArray = numbers.split(delimitersRegex).map(n => parseInt(n)).filter(n => !isNaN(n));
    const negatives = numArray.filter(n => n < 0);

    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return numArray.filter(n => n <= 1000).reduce((sum, num) => sum + num, 0);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
