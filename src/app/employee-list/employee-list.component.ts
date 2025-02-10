import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  EmployeeService,
  Employee,
} from '../employee-details/employee-details.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [
    {
      id: 1,
      firstName: 'Andrew',
      lastName: 'Cencini',
      company: 'Northwind Traders',
      jobTitle: 'Vice President, Sales',
      businessPhone: '(123)555-0100',
      homePhone: '(123)555-0102',
      mobilePhone: '',
      faxNumber: '(123)555-0103',
      street: '123 2nd Avenue',
      city: 'Bellevue',
      stateProvince: 'WA',
      zipPostalCode: '99999',
      countryRegion: 'USA',
      email: 'andrew@northwindtraders.com',
      webPage: 'http://northwindtraders.com',
      notes:
        'Joined the company as a sales representative, was promoted to sales manager and was then named vice president of sales.',
    },
    {
      id: 2,
      firstName: 'Edward',
      lastName: 'Cencini',
      company: 'Northwind Traders',
      jobTitle: 'Vice President, Sales',
      businessPhone: '(123)555-0100',
      homePhone: '(123)555-0102',
      mobilePhone: '',
      faxNumber: '(123)555-0103',
      street: '123 2nd Avenue',
      city: 'Bellevue',
      stateProvince: 'WA',
      zipPostalCode: '99999',
      countryRegion: 'USA',
      email: 'andrew@northwindtraders.com',
      webPage: 'http://northwindtraders.com',
      notes:
        'Joined the company as a sales representative, was promoted to sales manager and was then named vice president of sales.',
    },
    // Add other employees with exact field names
  ];
  searchTerm = '';
  filteredData = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.employees);
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (err) => {
        console.error('Failed to load employees', err);
      },
    });
  }

  navigateToAddEmployee(): void {
    this.router.navigate(['/employees/new']);
  }

  navigateToEditEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (err) => console.error('Delete failed', err),
      });
    }
  }

  filteredEmployees(): Employee[] {
    return this.employees.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
