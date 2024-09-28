import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PyqUploadService } from './pyq-upload.service';

@Component({
  selector: 'app-upload-pyq',
  templateUrl: './upload-pyq.component.html',
  styleUrls: ['./upload-pyq.component.css']
})
export class UploadPyqComponent implements OnInit {
  questionPaperForm: FormGroup;
  semesters: string[] = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];
  types: string[] = ['Mst-1', 'Mst-2', 'Mst-3', 'End Sem'];
  courses: string[] = [];
  // otherCourseSelected = false;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private pyqUploadService: PyqUploadService) {
    this.questionPaperForm = this.fb.group({
      semester: [null, Validators.required],
      type: [null, Validators.required],
      course: [null, Validators.required],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],  
      file: [null, Validators.required]  
    });
  }

  onCourseSelection(selectedValue: string) {
      this.questionPaperForm.get('otherCourse')?.setValue('');
    }
  
 
  ngOnInit(): void {
    this.pyqUploadService.getCourses().subscribe({
      next: (courses: any[]) => {
        console.log('Fetched courses:', courses); 

        this.courses = courses.map(course => course.courseName);  
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  
  }

  // Handle file selection
  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   this.selectedFile = file;
  //   this.questionPaperForm.patchValue({
  //     file: file
  //   });
  // }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
    }
  }
  

  onSubmit(): void {
    if (this.questionPaperForm.invalid || !this.selectedFile) {
      alert('Please complete the form and upload a valid file.');
      return;
    }

    const formData = new FormData();
    formData.append('semester', this.questionPaperForm.get('semester')?.value);
    formData.append('type', this.questionPaperForm.get('type')?.value);
    formData.append('course', this.questionPaperForm.get('course')?.value);
    formData.append('year', this.questionPaperForm.get('year')?.value);
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.pyqUploadService.uploadFile(formData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully!', response);
        alert('File uploaded successfully!');
        this.questionPaperForm.reset();
        this.selectedFile = null;   // Optionally reset the form
      },
      error: (err) => {
        console.error('Error uploading file:', err);
        alert('Error uploading file. Please try again.');
      }
    });
  }
}
