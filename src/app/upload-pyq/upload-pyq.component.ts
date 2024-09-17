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
  courses: string[] = ['Course 1', 'Course 2', 'Course 3'];
  otherCourseSelected = false;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private pyqUploadService: PyqUploadService) {
    // Initialize the form with validators
    this.questionPaperForm = this.fb.group({
      semester: [null, Validators.required],
      type: [null, Validators.required],
      course: [null, Validators.required],
      otherCourse: [null],
      year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],  // Year must be 4 digits
      file: [null, Validators.required]  // Ensure a file is uploaded
    });
  }

  // Handle course selection logic for "other" option
  onCourseSelection(selectedValue: string) {
    this.otherCourseSelected = selectedValue === 'other';
    if (!this.otherCourseSelected) {
      this.questionPaperForm.get('otherCourse')?.setValue('');
    }
  }

  ngOnInit(): void {}

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
  

  // Handle form submission
  onSubmit(): void {
    if (this.questionPaperForm.invalid || !this.selectedFile) {
      alert('Please complete the form and upload a valid file.');
      return;
    }

    // Prepare the form data and file for submission
    const formData = new FormData();
    formData.append('semester', this.questionPaperForm.get('semester')?.value);
    formData.append('type', this.questionPaperForm.get('type')?.value);
    formData.append('course', this.questionPaperForm.get('course')?.value);
    formData.append('year', this.questionPaperForm.get('year')?.value);
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // Call the service to submit data
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
