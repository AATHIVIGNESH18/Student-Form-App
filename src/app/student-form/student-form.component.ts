import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student {
  name: string;
  age: any | null;
  gender: string;
  course: string;
  email: string;
}

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {
  students: Student[] = [];
  currentStudent: Student = { name: '', age: null, gender: '', course: '', email: '' };
  isEdit = false;
  editIndex: number | null = null;

  onSubmit(form: any) {
    if (this.isEdit && this.editIndex !== null) {
      this.students[this.editIndex] = { ...this.currentStudent };
    } else {
      this.students.push({ ...this.currentStudent });
    }
    this.resetForm(form);
  }

  editStudent(index: number) {
    this.currentStudent = { ...this.students[index] };
    this.isEdit = true;
    this.editIndex = index;
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
    if (this.editIndex === index) {
      this.resetForm();
    }
  }

  resetForm(form?: any) {
    this.currentStudent = { name: '', age: null, gender: '', course: '', email: '' };
    this.isEdit = false;
    this.editIndex = null;
    if (form) {
      form.resetForm();
    }
  }
}
