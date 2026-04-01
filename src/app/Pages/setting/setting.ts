import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-setting',
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {

}
