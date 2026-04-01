 import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit, OnDestroy {

  currentDateTime: Date = new Date();
  private timerId: any;

  @Output() toggleSidebar = new EventEmitter<void>(); // ✅ emit to parent

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  onToggleSidebar() {
    this.toggleSidebar.emit(); // ✅ fire event
  }
}
