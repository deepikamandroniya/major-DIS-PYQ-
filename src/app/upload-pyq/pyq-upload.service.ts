import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PyqUploadService {

  private apiUrl = 'http://localhost:8080/api/upload/upload';  
  private coursesUrl = 'http://localhost:8080/api/courses';  

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
    }
    
    getCourses(): Observable<any> {
      return this.http.get<any>(this.coursesUrl);
    }
  
}
