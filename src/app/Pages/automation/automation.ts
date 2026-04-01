 import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './automation.html',
  styleUrls: ['./automation.css']
})
export class Automation {

  status = 'all';
  showForm = false;

  editIndex: number | null = null;

  form: any = {
    name: '',
    trigger: 'comment',
    keyword: '',
    message: ''
  };

  automations: any[] = [
    {
      id: Date.now(),
      name: 'Welcome Flow',
      trigger: 'comment',
      keyword: 'START',
      message: 'Hey! Check your DM 👇',
      leads: 45,
      active: true
    }
  ];

  // OPEN FORM
  openForm() {
    this.form = {
      name: '',
      trigger: 'comment',
      keyword: '',
      message: ''
    };
    this.editIndex = null;
    this.showForm = true;
  }

  // CLOSE
  close() {
    this.showForm = false;
  }

  // SAVE
  save() {

    // VALIDATION
    if (!this.form.name || !this.form.keyword || !this.form.message) {
      alert('Please fill all fields');
      return;
    }

    // EDIT MODE
    if (this.editIndex !== null) {
      this.automations[this.editIndex] = {
        ...this.form,
        id: this.automations[this.editIndex].id,
        leads: this.automations[this.editIndex].leads,
        active: this.automations[this.editIndex].active
      };
    } else {
      // CREATE
      this.automations.push({
        ...this.form,
        id: Date.now(),
        leads: 0,
        active: true
      });
    }

    this.editIndex = null;
    this.close();
  }

  // EDIT
  edit(item: any, index: number) {
    this.form = { ...item };
    this.editIndex = index;
    this.showForm = true;
  }

  // DELETE
  delete(index: number) {
    this.automations.splice(index, 1);
  }

  // TOGGLE ACTIVE/PAUSE
  toggle(item: any) {
    item.active = !item.active;
  }

  // FILTER STATUS
  setStatus(val: string) {
    this.status = val;
  }

  filteredList() {
    let data = [...this.automations];

    if (this.status === 'active') {
      data = data.filter(x => x.active);
    }

    if (this.status === 'inactive') {
      data = data.filter(x => !x.active);
    }

    return data;
  }
}