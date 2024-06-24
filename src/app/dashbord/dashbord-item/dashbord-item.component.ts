import { Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'app-dashbord-item',
  standalone: true,
  imports: [],
  templateUrl: './dashbord-item.component.html',
  styleUrl: './dashbord-item.component.css',
  // encapsulation: ViewEncapsulation.None,
  //   host: {
  //   class: 'dashboard-item'
  // }
})
export class DashbordItemComponent {
  // @Input({required: true}) image!: { src: string, alt: string} 
  // @Input({required: true}) title!: string 
  
  image = input.required<{ 
    src: string
    alt: string
  }>()
  title = input.required<string>()
}
