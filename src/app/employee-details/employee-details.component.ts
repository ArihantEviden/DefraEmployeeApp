import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from './employee-details.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  isLoading = false;
  error: string | null = null;
  isEditMode = false;
  employee: Employee = {
    firstName: 'Andrew',
    lastName: 'Cencini',
    company: 'Northwind Traders',
    jobTitle: 'Vice President, Sales',
    businessPhone: '(123)555-0100',
    homePhone: '(123)555-0102',
    city: 'Bellevue',
    stateProvince: 'WA',
    zipPostalCode: '99999',
    countryRegion: 'USA',
    email: 'andrew@northwindtraders.com',
    webPage: 'http://northwindtraders.com',
    street: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      console.log('Edit mode');
      this.isEditMode = true;
      //this.employee = this.employee;
      this.employeeService.getEmployee(+id).subscribe({
        next: (employee) => {
          this.employee = employee;
        },
        error: (err) => {
          console.error('Failed to load employee', err);
        },
      });
    } else {
      this.employee = {
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        businessPhone: '',
        homePhone: '',
        city: '',
        stateProvince: '',
        zipPostalCode: '',
        countryRegion: '',
        email: '',
        webPage: '',
        street: '',
      };
    }
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employees';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  selectEmployee(employee: Employee): void {
    this.selectedEmployee = { ...employee };
  }

  saveEmployee(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee).subscribe({
        next: () => this.navigateToList(),
        error: (err) => console.error('Update failed', err),
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe({
        next: () => this.navigateToList(),
        error: (err) => console.error('Create failed', err),
      });
    }
  }

  navigateToList(): void {
    this.router.navigate(['/employees']);
  }
}
