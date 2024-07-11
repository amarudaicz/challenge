import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})

export class DetailProductComponent {

  @Input() product:any
  @Output() closeDetails = new EventEmitter()


}
