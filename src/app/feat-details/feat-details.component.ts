import { Component, Input } from '@angular/core';
import { Feat } from '../interfaces';

@Component({
  selector: 'app-feat-details',
  imports: [],
  templateUrl: './feat-details.component.html',
  styleUrl: './feat-details.component.css'
})
export class FeatDetailsComponent {
  @Input() feat!: Feat

}
