import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
    selector: 'app-product-read',
    templateUrl: './product-read.component.html',
    styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
    @ViewChild(MatTable) table!: MatTable<Product>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns = ['id', 'name', 'price'];
    products!: Product[];

    dataSource = new MatTableDataSource();

    constructor(private productService: ProductService, private _liveAnnouncer: LiveAnnouncer) {
    }

    ngOnInit(): void {
        this.productService.read().subscribe(products => {
            this.products = products
            this.dataSource.data = products;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }
}
