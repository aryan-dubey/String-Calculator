import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StringCalculatorService } from '../string-calculator.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  numbers: string = '';
  result: number | null = null;
  errorMessage: string | null = null;

  constructor(private stringCalculatorService: StringCalculatorService) { }

  onSubmit() {
    try {
      this.result = this.stringCalculatorService.add(this.numbers);
      this.errorMessage = null;
    } catch (error) {
      this.result = null;
      this.errorMessage = (error as Error).message;
    }
  }
}
