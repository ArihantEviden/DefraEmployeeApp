import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeDetailsComponent },
  { path: 'employees/edit/:id', component: EmployeeDetailsComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];
