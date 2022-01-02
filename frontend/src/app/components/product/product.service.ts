import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Product} from "./product.model";
import {catchError, EMPTY, Observable} from "rxjs";
import {ProductCreateComponent} from "./product-create/product-create.component";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    baseUrl = "http://localhost:3001/products";

    constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    }

    create(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, product).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e, "Erro ao criar o produto!"))
        );
    }

    update(product: Product): Observable<Product> {
        const url = `${this.baseUrl}/${product.id}`;

        return this.http.patch<Product>(url, product).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e, "Erro ao atualizar o produto!"))
        );
    }

    delete(id: string): Observable<Product> {
        const url = `${this.baseUrl}/${id}`;

        return this.http.delete<Product>(url).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e, "Erro ao deletar o produto!"))
        );
    }

    read(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e, "Erro ao atualizar a tabela!"))
        );
    }

    readById(id: string): Observable<Product> {
        const url = `${this.baseUrl}/${id}`;

        return this.http.get<Product>(url).pipe(
            map((obj) => obj),
            catchError(e => this.errorHandler(e, "Erro ao buscar o produto!"))
        );
    }

    showMessage(msg: string, isError: boolean = false): void {
        this.snackBar.open(msg, 'X', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
            panelClass: isError ? ['msg-error'] : ['msg-success']
        });
    }

    errorHandler(e: any, msg: string): Observable<any> {
        this.showMessage(msg, true);
        return EMPTY;
    }
}
