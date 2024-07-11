import { Component } from '@angular/core';
import { ListProductsComponent } from '../../products/list-products/list-products.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ListProductsComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss' 
})
export class MainLayoutComponent {

}
