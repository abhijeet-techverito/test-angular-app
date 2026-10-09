import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-store-count',
  templateUrl: './store-count.component.html',
  styleUrls: ['./store-count.component.css'],
  standalone: false
})
export class StoreCountComponent {
  @Input() shown = 0;
  @Input() total = 0;
}
