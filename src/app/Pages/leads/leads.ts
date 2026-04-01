import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeadService } from '../../Core/Services/Lead-Service/lead-service';
 
import { ColDef, } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Lead } from '../../models/App.models';

 
@Component({
  selector: 'app-leads',
  imports: [CommonModule, FormsModule,AgGridAngular],
  templateUrl: './leads.html',
  styleUrl: './leads.css',
  encapsulation: ViewEncapsulation.None
})
export class Leads  implements OnInit {

  constructor(private leadService: LeadService) {}

  searchText: string = '';
  selectedSource: string = '';

  selectedLead: Lead | null = null;
  isDrawerOpen = false;
  isDMMode: boolean = false;
  manualMessage: string = '';
  rowData: Lead[] = [];

columnDefs: ColDef<Lead>[] = [
  {
    field: 'name',
    headerName: 'Name',
    
  },
  {
    field: 'instagram',
    headerName: 'Instagram', 
  },
  {
    field: 'source',
    headerName: 'Source', filter:true
  },
    {
    field: 'tags',
    headerName: 'Tags',  
  },
  {
    headerName: 'Action',
    width: 130,
    
    // ✅ FIX: use function properly typed
    cellRenderer: () => {
      return `<button class="btn btn-sm btn-primary view-btn">View</button>`;
    },

    // ✅ FIX: explicitly typed params
   onCellClicked: (params) => {
  if ((params.event?.target as HTMLElement)?.classList?.contains('view-btn')) {
    this.openDrawer(params.data);
  }
}
  }
];

defaultColDef = {
  resizable: true,
  sortable: true,
  filter: false,          // ❌ remove filter
  suppressMenu: true,     // ❌ remove header menu icon
  flex: 1,
  minWidth: 120,
  wrapText: true,
  autoHeight: true
};
  gridApi: any;

  
  ngOnInit() {
    this.loadLeads();
  }
  openDrawer(data: any) {
  this.selectedLead = data;
  this.isDrawerOpen = true;
}

  // 🔥 Main Loader (API + Dummy fallback)
  loadLeads() {
    this.leadService.getLeads().subscribe((data) => {
      if (data && data.length) {
        this.rowData = data;
      } else {
        this.rowData = this.generateLeads(50);
      }
    });
  }

  // 🎲 Dummy Data Generator
  generateLeads(count: number): Lead[] {
    const names = ['Amit', 'Priya', 'Rahul', 'Sneha', 'Vikas', 'Neha'];
    const sources = ['DM', 'Comment', 'Story Reply', 'Ad'];
    const tagsList = ['Hot', 'Warm', 'Cold', 'Interested'];

    const data = [];

    for (let i = 0; i < count; i++) {
      const name = names[Math.floor(Math.random() * names.length)];

      data.push({
        name,
        instagram: `@${name.toLowerCase()}${Math.floor(Math.random() * 1000)}`,
        source: sources[Math.floor(Math.random() * sources.length)],
        date: new Date(
          2026,
          2,
          Math.floor(Math.random() * 28) + 1
        ).toISOString().split('T')[0],
        tags: [tagsList[Math.floor(Math.random() * tagsList.length)]]
      });
    }

    return data;
  }
onGridReady(params: any) {
  this.gridApi = params.api;

  if (window.innerWidth < 768) {
    this.gridApi.setColumnDefs([
      { field: 'name', flex: 1 },
      { field: 'source', width: 100 },
      { field: 'instagram', hide: true }, // hide heavy columns
      { field: 'tags', hide: true }
    ]);
  }
}

onSearch() {
  if (!this.gridApi) return;

  this.gridApi.setGridOption('quickFilterText', this.searchText);
}

  // 🎯 Filter
  onFilterChange() {
    if (this.selectedSource) {
      this.gridApi.setFilterModel({
        source: {
          type: 'equals',
          filter: this.selectedSource
        }
      });
    } else {
      this.gridApi.setFilterModel(null);
    }
  }

  onRowClicked(event: any) {
    this.selectedLead = event.data;
    this.isDrawerOpen = true;
  }

  exportCSV() {
    this.gridApi.exportDataAsCsv();
  }

  newTag: string = '';

  addTag() {
    if (this.newTag.trim() && this.selectedLead) {
      this.selectedLead.tags.push(this.newTag);
      this.newTag = '';
    }
  }

  sendDM() {
  if (!this.isDMMode) {
    // 👉 First click → open input
    this.isDMMode = true;
    return;
  }

  // 👉 Second click → send message
  if (!this.manualMessage.trim()) {
    alert('Please enter message');
    return;
  }

  if (this.selectedLead) {
    const payload = {
      instagram: this.selectedLead.instagram,
      message: this.manualMessage
    };

    // 🔥 Call API
    this.leadService.sendDM(payload).subscribe({
      next: () => {
        alert('DM Sent Successfully 🚀');
        this.manualMessage = '';
        this.isDMMode = false;
      },
      error: () => {
        alert('Failed to send DM ❌');
      }
    });
  }
}
}