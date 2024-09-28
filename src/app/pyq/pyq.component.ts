import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from '../all.service';

@Component({
  selector: 'app-pyq',
  templateUrl: './pyq.component.html',
  styleUrls: ['./pyq.component.css']
})
export class PYQComponent implements OnInit {
  questionPaperForm: FormGroup;
  semesters: string[] = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];
  types: string[] = ['Mst-1', 'Mst-2', 'Mst-3', 'End Sem'];
  courses: string[] = [];
  pyqList: any[] = [];

  constructor(private fb: FormBuilder, private allService: AllService) {
    // Initialize the form group
    this.questionPaperForm = this.fb.group({
      semester: [null],
      type: [null],
      course: [null],
    });
  }

  ngOnInit(): void {
    this.allService.getCourses().subscribe({
      next: (courses: any[]) => {
        console.log('Fetched courses:', courses);
        this.courses = courses.map(course => course.courseName);
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  
  onGenerate() {
    const selectedSemester = this.questionPaperForm.get('semester')?.value;
    const selectedType = this.questionPaperForm.get('type')?.value;
    const selectedCourse = this.questionPaperForm.get('course')?.value;
    
    if (selectedSemester && selectedType && selectedCourse) {
      console.log('Generating PYQ for:', selectedSemester, selectedType, selectedCourse);
  
      this.generatePYQ(selectedSemester, selectedType, selectedCourse);
    } else {
      console.error('Please select all fields!');
      alert('Please select all the required fields (Semester, Type, and Course).');
    }
  }

  
  generatePYQ(semester: string, type: string, course: string): void {
    this.allService.generatePyq(semester, type, course).subscribe({
      next: response => {
        console.log('Response from backend:', response); 
        if (response && response.length > 0) {
          this.pyqList = response; // Store the filtered PYQs
        } else {
          // Display message if no PYQs are found
          alert('No question papers available for the selected filters.');
          this.pyqList = []; // Clear the list if no results found
        }
      },
      error: error => {
        console.error('Error generating PYQ:', error);
        alert('Error fetching the question papers. Please try again later.');
      }
    });
  }

  
  previewAndDownloadFile(filePath: string): void {
    this.allService.previewFile(filePath).subscribe({
      next: blob => {
        // Preview the file
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank'); 
        const a = document.createElement('a');
        a.href = url;
        a.download = this.extractFileName(filePath); 
        a.click();
      },
      error: err => {
        console.error('Error previewing or downloading the file:', err);
        alert('Error previewing or downloading the file. Please try again later.');
      }
    });
  }

  extractFileName(filePath: string): string {
    return filePath.split('/').pop() ?? 'downloaded-file';
  }
}
