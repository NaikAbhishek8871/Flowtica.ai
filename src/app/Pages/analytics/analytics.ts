 import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { AnalyticsService } from '../../Core/Services/Analytics/analyticsservice';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class Analytics implements OnInit {

  kpi: any = {};
  automations: any[] = [];
  insights: string[] = [];

  leadsChart: any;
  conversionChart: any;

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    const data = this.analyticsService.getAnalyticsData();

    this.kpi = data.kpi;
    this.automations = data.automations;
    this.insights = data.insights;

    this.loadCharts(data);
  }

  loadCharts(data: any) {

    if (this.leadsChart) this.leadsChart.destroy();
    if (this.conversionChart) this.conversionChart.destroy();

    // ===== LEADS CHART (UPDATED 🔥) =====
    const canvas = document.getElementById('leadsChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradient = ctx!.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    this.leadsChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: data.leadsChart.labels,
        datasets: [{
          label: 'Leads',
          data: data.leadsChart.data,

          borderColor: '#3b82f6',
          borderWidth: 3,

          backgroundColor: gradient,
          fill: true,

          tension: 0.4,

          pointBackgroundColor: '#3b82f6',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            grid: { color: '#e5e7eb' }
          }
        }
      }
    });

    // ===== CONVERSION CHART (UPDATED 🔥) =====
    this.conversionChart = new Chart('conversionChart', {
      type: 'bar',
      data: {
        labels: ['Sent', 'Converted'],
        datasets: [{
          label: 'DM',
          data: [data.dm.sent, data.dm.converted],

          backgroundColor: ['#60a5fa', '#34d399'], // blue + green
          borderRadius: 8,
          barThickness: 40
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            grid: { color: '#e5e7eb' }
          }
        }
      }
    });
  }
}