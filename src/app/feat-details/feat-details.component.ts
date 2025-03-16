import { Component, Input, inject } from '@angular/core';
import { Feat } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { HttpAccessService } from '../http-access.service';

@Component({
  selector: 'app-feat-details',
  imports: [],
  templateUrl: './feat-details.component.html',
  styleUrl: './feat-details.component.css'
})
export class FeatDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  httpAccessService = inject(HttpAccessService);
  feat: Feat | undefined;

  constructor(){
    const feat_id = this.route.snapshot.params['id'];
    console.log()
    this.httpAccessService.getFeatById(feat_id).then((feat) => {
      this.feat = feat;
    });
  }
}
