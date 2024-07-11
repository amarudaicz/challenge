import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {

  constructor(private http:HttpClient) { 
    this.getAllProducts(null)
  } 

  baseUrl:string = 'http://localhost:3000'

  private allProductsSubject = new BehaviorSubject<any[]|undefined>(undefined);
  allProducts$ = this.allProductsSubject.asObservable();

 

  public getAllProducts(filters: any) {
    let params = new HttpParams();
    
    for (let key in filters) {
      if (filters.hasOwnProperty(key)) {
        params = params.append(key, filters[key]);
      }
    }
    
    return this.http.get<any[]>(`${this.baseUrl}/products`, { params })
      .pipe(
        catchError(this.handleError),
        map(products=> {
          this.allProductsSubject.next(products);
          return products
        })
      );
  }


  getProduct(id:string){
    return this.http.get<any>(`${this.baseUrl}/products/${id}`)
  }

  postProduct(product:any){
    return this.http.post(`${this.baseUrl}/products`, product)
  }

  putProduct(product:any){
    return this.http.put(`${this.baseUrl}/products`, product)
  }

  deleteProduct(id:string){
    return this.http.delete(`${this.baseUrl}/products/${id}` )
  }

  private handleError(error: any): Observable<never> {
    return throwError(()=> 'A ocurrido un error');
  }


}
