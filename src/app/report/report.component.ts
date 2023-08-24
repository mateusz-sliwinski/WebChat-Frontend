import { Component } from '@angular/core';
import { ErrorReportService } from '../_services/report.services';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  description: string = '';
  isReportSuccessful: boolean = false;
  isReportError: boolean = false;

  constructor(private errorReportService: ErrorReportService) { }

  submitReport() {
    if (this.description.trim()) {
      if (this.description.length <= 1500) {
        this.errorReportService.reportError(this.description)
          .subscribe(
            response => {
              console.log(response.message);
              this.description = '';
              this.isReportSuccessful = true;
              this.isReportError = false;
              setTimeout(() => {
                this.isReportSuccessful = false;
              }, 5000);
            },
            error => {
              console.error('Error reporting: ', error);
              this.isReportError = true;
              this.isReportSuccessful = false;
            }
          );
      } else {
        this.isReportError = true;
        this.isReportSuccessful = false;
      }
    }
  }
}