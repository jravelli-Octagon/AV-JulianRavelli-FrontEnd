import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  copyrigth: string = '';
  logo: string = '';
  constructor(private translateService: TranslateService) {

  }

  ngOnInit(): void {
    this.copyrigth = 'Copyright ' + new Date().getFullYear() + ' ' + this.translateService.instant('All right register') + ' | America Virtual.'
  }
  
}
