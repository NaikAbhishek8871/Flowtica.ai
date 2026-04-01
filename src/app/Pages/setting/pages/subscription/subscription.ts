import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  popular?: boolean;
  features: PlanFeature[];
}

@Component({
  selector: 'app-subscription',
  imports: [CommonModule,FormsModule],
  templateUrl: './subscription.html',
  styleUrl: './subscription.css',
  encapsulation:ViewEncapsulation.None
})
export class Subscription {
  selectedPlan = 'free';

  plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic tools for starters.',
      price: 0,
      features: [
        { name: '1 Instagram account', included: true },
        { name: '1 Automation', included: true },
        { name: '50 DMs / month', included: true },
        { name: '100 Leads', included: true },
        { name: 'Export leads', included: false },
        { name: 'Multi-step automation', included: false },
        { name: 'API access', included: false },
        { name: 'Priority queue', included: false }
      ]
    },
    {
      id: 'creator',
      name: 'Creator',
      description: 'Advanced insights & tools.',
      price: 12,
      popular: true,
      features: [
        { name: '1 Instagram account', included: true },
        { name: '5 Automations', included: true },
        { name: '1000 DMs / month', included: true },
        { name: 'Unlimited Leads', included: true },
        { name: 'Export leads', included: true },
        { name: 'Multi-step automation', included: false },
        { name: 'API access', included: false },
        { name: 'Priority queue', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'All-inclusive power features.',
      price: 29,
      features: [
        { name: '3 Instagram accounts', included: true },
        { name: 'Unlimited Automations', included: true },
        { name: '10000 DMs / month', included: true },
        { name: 'Unlimited Leads', included: true },
        { name: 'Export leads', included: true },
        { name: 'Multi-step automation', included: true },
        { name: 'API access', included: true },
        { name: 'Priority queue', included: true }
      ]
    }
  ];

  changePlan(plan: string) {
    this.selectedPlan = plan;
    alert(`Switched to ${plan.toUpperCase()} plan 🚀`);
  }
}