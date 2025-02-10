import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  businessPhone: string;
  homePhone: string;
  mobilePhone?: string;
  faxNumber?: string;
  street: string;
  city: string;
  stateProvince: string;
  zipPostalCode: string;
  countryRegion: string;
  email: string;
  webPage: string;
  notes?: string;
}
const employees = {
  id: 1,
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

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7100/api/employees'; // Adjust to your .NET API URL

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
