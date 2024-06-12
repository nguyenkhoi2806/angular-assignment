import { Component } from '@angular/core';

import { HeaderComponent } from 'app/components/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
