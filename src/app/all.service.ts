import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  private coursesUrl = 'http://localhost:8080/api/courses';  
  private pyqUrl='http://localhost:8080/api/pyq';

  constructor(private http: HttpClient) { }    
    getCourses(): Observable<any> {
      return this.http.get<any>(this.coursesUrl);
    }
    generatePyq(semester: string, type: string, course: string): Observable<any> {
      return this.http.get<{filepath:String,course:String,year:number}[]>(`${this.pyqUrl}/getFilePath`, { 
        params: { semester, type, course }
      });
    }
  
    downloadFile(filePath: string): Observable<Blob> {
      return this.http.get(`${this.pyqUrl}/download`, {
        params: { filePath },
        responseType: 'blob'
      });
    }
    // Preview the file based on its file path (for opening in a new tab)
  previewFile(filePath: string): Observable<Blob> {
    return this.http.get(`${this.pyqUrl}/preview`, {
      params: { filePath },
      responseType: 'blob'
    });
  }
  // New method to get the list of PYQs
  getPYQList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.pyqUrl}/list`);
  }
 // Basic error handling function
 private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  return throwError(() => new Error('Something went wrong; please try again later.'));
}
  
}
