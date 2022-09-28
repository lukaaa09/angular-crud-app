import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  public postProcuct(data: any) {
    return this.http.post<any>(`${this.baseUrl}/productlist/`, data)
  }

  public getProcuct() {
    return this.http.get<any>(`${this.baseUrl}/productlist/`)
  }
}
