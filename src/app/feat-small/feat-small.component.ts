import { Component, Input } from '@angular/core';
import { Feat } from '../interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feat-small',
  imports: [RouterModule],
  templateUrl: './feat-small.component.html',
  styleUrl: './feat-small.component.css'
})
export class FeatSmallComponent {
  @Input() feat!: Feat
}
