import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';
 
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../Core/Services/Websocket-Service/websocket-service';
 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements AfterViewInit, OnDestroy {

stats = {
  totalLeads: 0,
  dmsSent: 0,
  activeAutomation: 0
};

  recentActivities: any[] = [];

  private chart: any;
  private wsSub!: Subscription;

  constructor(private wsService: WebsocketService) {}

  ngAfterViewInit() {
    this.initChart();      // 🎯 create chart once
    this.connectSocket();  // 📡 start websocket
  }

  // 📡 CONNECT WEBSOCKET
  connectSocket() {
    this.wsService.connect();

    this.wsSub = this.wsService.dashboard$.subscribe((data) => {
      if (!data) return;

      console.log('🔥 LIVE DATA:', data);

      // 🔢 update stats
      this.stats = data;

      // 📊 update chart
      this.updateChart(data.totalLeads);

      // 📜 update activity
      this.addActivity('New update received');
    });
  }

initChart() {
  const ctx = document.getElementById('leadChart') as any;

  this.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [], // ❌ remove fake labels
      datasets: [{
        data: [], // ❌ remove fake data
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      animation: false,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

hasChartData(): boolean {
  return !!this.chart &&
         this.chart.data.datasets.length > 0 &&
         this.chart.data.datasets[0].data.length > 0;
}

updateChart(newValue: number) {
  if (!this.chart) return;

  const dataset = this.chart.data.datasets[0].data;
  const labels = this.chart.data.labels;

  // 🧩 push new point
  dataset.push(newValue);
  labels.push(new Date().toLocaleTimeString()); // dynamic time label

  // keep last 7 points
  if (dataset.length > 7) {
    dataset.shift();
    labels.shift();
  }

  this.chart.update();
}

  // 📜 ADD ACTIVITY
  addActivity(text: string) {
    this.recentActivities.unshift({
      text,
      time: 'Just now'
    });

    if (this.recentActivities.length > 6) {
      this.recentActivities.pop();
    }
  }

  // 🧹 CLEANUP
  ngOnDestroy() {
    this.wsSub?.unsubscribe();
    this.wsService.disconnect?.();
  }
}