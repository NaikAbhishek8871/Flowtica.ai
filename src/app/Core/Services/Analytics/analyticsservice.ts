import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  getAnalyticsData() {
    return {
      kpi: {
        totalLeads: 1200,
        converted: 340,
        conversionRate: 28,
        messagesSent: 2000
      },
dm: {
  sent: 2000,
  converted: 340
},
      leadsChart: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        data: [50, 80, 60, 120, 150, 180, 160]
      },

      automations: [
        { name: 'Welcome Flow', leads: 400, conversion: 35, status: 'Active' },
        { name: 'Follow-up', leads: 300, conversion: 25, status: 'Active' },
        { name: 'Re-engagement', leads: 200, conversion: 18, status: 'Paused' }
      ],

      insights: [
        'Conversion increased by 12%',
        'Best automation: Welcome Flow',
        'Peak time: 7 PM'
      ]
    };
  }
}