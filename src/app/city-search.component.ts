import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
  standalone: false
})
export class CitySearchComponent {
  @Input() stores: any[] = [];
  @Output() searchChange = new EventEmitter<string>();
  @Output() pick = new EventEmitter<any>();

  text = '';
  open = false;
  suggestions: any[] = [];
  matchCount = 0;

  onType() {
    this.searchChange.emit(this.text);
    this.updateSuggestions();
  }

  updateSuggestions() {
    var q = this.text.toLowerCase();
    this.suggestions = [];
    this.matchCount = 0;
    if (q == '') {
      this.open = false;
      return;
    }
    var res = [];
    for (var i = 0; i < this.stores.length; i++) {
      var s = this.stores[i];
      if (s.city.toLowerCase().indexOf(q) > -1 ||
          s.zip.toLowerCase().replace(' ', '').indexOf(q.replace(' ', '')) > -1) {
        res.push(s);
      }
    }
    this.matchCount = res.length;
    this.suggestions = res.slice(0, 5);
    this.open = true;
  }

  choose(s: any) {
    this.text = s.city;
    this.open = false;
    this.pick.emit(s);
  }

  clear() {
    this.text = '';
    this.suggestions = [];
    this.matchCount = 0;
    this.searchChange.emit('');
  }

  closeLater() {
    setTimeout(() => { this.open = false; }, 150);
  }
}
