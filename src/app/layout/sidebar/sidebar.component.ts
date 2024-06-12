import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterOutlet, RouterModule],
  standalone: true,
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
