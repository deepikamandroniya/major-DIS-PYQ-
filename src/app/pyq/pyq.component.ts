import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pyq',
  templateUrl: './pyq.component.html',
  styleUrl: './pyq.component.css'
})

export class PYQComponent {
  questionPaperForm: FormGroup;
  semesters: string[] = ['Semester 1', 'Semester 2','Semester 3','Semester 4','Semester 5','Semester 6','Semester 7','Semester 8'];
  types: string[] = ['Mst-1', 'Mst-2','Mst-3','End Sem'];
  courses: string[] = ['Course 1', 'Course 2', 'Course 3'];

  constructor(private fb: FormBuilder) {
    this.questionPaperForm = this.fb.group({
      semester: [null],
      type:[null],
      course: [null],
    });
  }

  onGenerate() {
    const selectedSemester = this.questionPaperForm.get('semester')?.value;
    const selectedtype = this.questionPaperForm.get('type')?.value;
    const selectedCourse = this.questionPaperForm.get('course')?.value;
    console.log('Semester:', selectedSemester,'Type:',selectedtype,  'Course:', selectedCourse);

  }
}

