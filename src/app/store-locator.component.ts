import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-store-locator',
  templateUrl: './store-locator.component.html',
  styleUrls: ['./store-locator.component.css'],
  standalone: false
})
export class StoreLocatorComponent implements OnInit {

  // TODO move this to a service once we have an API
  stores: any[] = [
    {
      id: 1,
      name: 'Oxford Street Flagship',
      city: 'London',
      addr: '212 Oxford Street',
      zip: 'W1D 1LA',
      phone: '020 7946 0100',
      hours: 'Mon-Sat 10:00-21:00, Sun 12:00-18:00',
      services: ['Fitting rooms', 'Click & collect', 'Alterations'],
      lat: 51.5154, lon: -0.1426,
      featuredSlug: 'classic-crew-tee',
      photo: 'https://picsum.photos/seed/store-1/640/400'
    },
    {
      id: 2,
      name: 'Soho Late',
      city: 'London',
      addr: '14 Berwick Street',
      zip: 'W1F 0PX',
      phone: '020 7946 0321',
      hours: 'Mon-Thu 10:00-22:00, Fri-Sat 10:00-02:00, Sun 12:00-18:00',
      services: ['Fitting rooms'],
      lat: 51.5136, lon: -0.1365,
      featuredSlug: 'vintage-wash-tee',
      photo: 'https://picsum.photos/seed/store-2/640/400'
    },
    {
      id: 3,
      name: 'Arndale Manchester',
      city: 'Manchester',
      addr: '49 High Street, Arndale Centre',
      zip: 'M4 3AQ',
      phone: '0161 496 0112',
      hours: 'Mon-Sat 10:00-20:00, Sun 11:00-17:00',
      services: ['Click & collect'],
      lat: 53.4839, lon: -2.2395,
      featuredSlug: 'essential-pullover-hoodie',
      photo: 'https://picsum.photos/seed/store-3/640/400'
    },
    {
      id: 4,
      name: 'Northern Quarter',
      city: 'Manchester',
      addr: '22 Oldham Street',
      zip: 'M1 1JQ',
      phone: '0161 496 0145',
      hours: 'Mon-Sun 11:00-00:00',
      services: ['Fitting rooms', 'Repairs'],
      lat: 53.4833, lon: -2.2358,
      featuredSlug: 'slim-fit-jeans',
      photo: 'https://picsum.photos/seed/store-4/640/400'
    },
    {
      id: 5,
      name: 'Princes Street',
      city: 'Edinburgh',
      addr: '57 Princes Street',
      zip: 'EH2 2DJ',
      phone: '0131 496 0188',
      hours: 'Mon-Sat 09:30-18:30, Sun 11:00-17:00',
      services: ['Fitting rooms', 'Click & collect'],
      lat: 55.9524, lon: -3.1975,
      featuredSlug: 'quilted-hooded-jacket',
      photo: 'https://picsum.photos/seed/store-5/640/400'
    },
    {id: 6, name: 'Broadmead', city: 'Bristol', addr: '31 Broadmead', zip: 'BS1 3DX', phone: '0117 496 0131',
     hours: 'Mon-Sat 09:00-18:00, Sun 11:00-17:00', services: ['Click & collect'],
     lat: 51.4590, lon: -2.5878, featuredSlug: 'classic-crew-tee',
     photo: 'https://picsum.photos/seed/store-6/640/400'},
    {id: 7, name: 'Briggate', city: 'Leeds', addr: '8 Briggate', zip: 'LS1 6AE', phone: '0113 496 0170',
     hours: 'Mon-Sat 09:00-18:00, Sun closed', services: ['Fitting rooms'],
     lat: 53.7973, lon: -1.5416, featuredSlug: 'zip-up-fleece-hoodie',
     photo: 'https://picsum.photos/seed/store-7/640/400'},
    {id: 8, name: 'Bullring', city: 'Birmingham', addr: 'Unit 14, Bullring', zip: 'B5 4BU', phone: '0121 496 0199',
     hours: 'Mon-Fri 10:00-20:00, Sat 09:00-20:00, Sun 11:00-17:00', services: ['Fitting rooms', 'Click & collect', 'Alterations'],
     lat: 52.4774, lon: -1.8940, featuredSlug: 'oversized-logo-hoodie',
     photo: 'https://picsum.photos/seed/store-8/640/400'},
    {id: 9, name: 'Buchanan Galleries', city: 'Glasgow', addr: '220 Buchanan Street', zip: 'G1 2GF', phone: '0141 496 0123',
     hours: 'Mon-Sat 09:30-18:00, Sun 11:00-17:00', services: ['Fitting rooms', 'Click & collect'],
     lat: 55.8636, lon: -4.2518, featuredSlug: 'essential-pullover-hoodie',
     photo: 'https://picsum.photos/seed/store-9/640/400'},
    {id: 10, name: 'Times Square', city: 'New York', addr: '1500 Broadway', zip: '10036', phone: '(212) 555-0114',
     hours: 'Mon-Sun 09:00-23:00', services: ['Fitting rooms', 'Click & collect'],
     lat: 40.7580, lon: -73.9855, featuredSlug: 'slim-fit-jeans',
     photo: 'https://picsum.photos/seed/store-10/640/400'},
    // --- Q2 additions (list from retail ops) ---
    {id: 11, name: 'Michigan Avenue', city: 'Chicago', addr: '835 N Michigan Ave', zip: '60611', phone: '(312) 555-0168',
     hours: 'Mon-Sat 10:00-20:00, Sun 11:00-18:00', services: ['Click & collect'],
     lat: 41.8986, lon: -87.6247, featuredSlug: 'quilted-hooded-jacket',
     photo: 'https://picsum.photos/seed/store-11/640/400'},
    {id: 12, name: 'SoHo NYC', city: 'New York', addr: '110 Prince Street', zip: '10012', phone: '(212) 555-0191',
     hours: 'Mon-Sat 11:00-20:00, Sun 12:00-18:00', services: ['Fitting rooms'],
     lat: 40.7249, lon: -73.9979, featuredSlug: 'vintage-wash-tee',
     photo: 'https://picsum.photos/seed/store-12/640/400'},
    {
      id: 13,
      name: "Melrose Avenue",
      city: "Los Angeles",
      addr: "8277 Melrose Ave",
      zip: "90046",
      phone: "(323) 555-0143",
      hours: "Mon-Sat 10:00-21:00, Sun 11:00-19:00",
      services: ["Fitting rooms", "Click & collect"],
      lat: 34.0838, lon: -118.3711,
      featuredSlug: "lightweight-summer-hoodie",
      photo: "https://picsum.photos/seed/store-13/640/400"
    },
    {
      id: 14,
      name: "Kurfürstendamm",
      city: "Berlin",
      addr: "Kurfürstendamm 26",
      zip: "10719",
      phone: "030 5557 0166",
      hours: "Mon-Sat 10:00-20:00, Sun closed",
      services: ["Fitting rooms"],
      lat: 52.5036, lon: 13.3311,
      featuredSlug: "classic-crew-tee",
      photo: "https://picsum.photos/seed/store-14/640/400"
    },
    {id: 15, name: 'Grafton Street', city: 'Dublin', addr: '70 Grafton Street', zip: 'D02 XY45', phone: '01 555 0177',
     hours: 'Mon-Sat 09:30-19:00, Sun 12:00-18:00', services: ['Click & collect', 'Alterations'],
     lat: 53.3412, lon: -6.2603, featuredSlug: 'zip-up-fleece-hoodie',
     photo: 'https://picsum.photos/seed/store-15/640/400'}
  ];

  searchText = '';
  filtered: any[] = [];
  selected: any = null;
  favs: number[] = [];
  favsLoaded = false;
  shareMsg = '';

  ngOnInit() {
    this.filtered = this.stores;
    this.applySort();
    this.loadFavs();
    // deep link from the share button
    var m = /[?&]store=(\d+)/.exec(window.location.search);
    if (m) {
      for (var i = 0; i < this.stores.length; i++) {
        if (this.stores[i].id == parseInt(m[1])) {
          this.selectStore(this.stores[i]);
        }
      }
    }
  }

  loadFavs() {
    try {
      var raw = localStorage.getItem('sl_favs');
      if (raw) {
        this.favs = JSON.parse(raw);
      }
    } catch (e) {
      // private mode etc
    }
    this.favsLoaded = true;
  }

  isFav(s: any) {
    if (!this.favsLoaded) {
      this.loadFavs();
    }
    return this.favs.indexOf(s.id) > -1;
  }

  toggleFav(s: any) {
    var idx = this.favs.indexOf(s.id);
    if (idx > -1) {
      this.favs.splice(idx, 1);
    } else {
      this.favs.push(s.id);
    }
    try {
      localStorage.setItem('sl_favs', JSON.stringify(this.favs));
    } catch (e) { }
  }

  // TODO sort the list by distance once this works
  locate() {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      var best: any = null;
      var bestD = 999999;
      for (var i = 0; i < this.stores.length; i++) {
        var dx = this.stores[i].lat - pos.coords.latitude;
        var dy = this.stores[i].lon - pos.coords.longitude;
        var d = dx * dx + dy * dy;
        if (d < bestD) {
          bestD = d;
          best = this.stores[i];
        }
      }
      console.log('nearest', best && best.name);
    });
  }

  shareStore(s: any) {
    var url = window.location.origin + '/?store=' + s.id;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.shareMsg = 'Link copied';
      }, () => {
        this.shareMsg = url;
      });
    } else {
      this.shareMsg = url;
    }
    setTimeout(() => { this.shareMsg = ''; }, 3000);
  }

  clickCollectOnly = false;

  doFilter() {
    var q = this.searchText.toLowerCase().trim();
    if (q == '' && !this.clickCollectOnly) {
      this.filtered = this.stores;
      this.applySort();
      return;
    }
    var res = [];
    for (var i = 0; i < this.stores.length; i++) {
      var s = this.stores[i];
      if (this.clickCollectOnly && s.services.indexOf('Click & collect') == -1) {
        continue;
      }
      if (q == '' ||
          s.city.toLowerCase().indexOf(q) > -1 ||
          s.name.toLowerCase().indexOf(q) > -1 ||
          s.zip.toLowerCase().replace(' ', '').indexOf(q.replace(' ', '')) > -1) {
        res.push(s);
      }
    }
    this.filtered = res;
    this.applySort();
  }

  onSearch(text: string) {
    this.searchText = text;
    this.doFilter();
    // deselect if the store dropped out of the list
    if (this.selected && this.filtered.indexOf(this.selected) == -1) {
      this.selected = null;
    }
  }

  onPick(s: any) {
    if (this.filtered.indexOf(s) == -1) {
      this.searchText = s.city;
      this.doFilter();
    }
    this.selectStore(s);
  }

  sortBy = 'name';

  applySort() {
    var list = this.filtered.slice();
    if (this.sortBy == 'city') {
      list.sort((a, b) => {
        if (a.city == b.city) {
          return a.name < b.name ? -1 : 1;
        }
        return a.city < b.city ? -1 : 1;
      });
    } else if (this.sortBy == 'open') {
      // open stores first
      list.sort((a, b) => {
        var ao = this.isOpenNow(a) ? 0 : 1;
        var bo = this.isOpenNow(b) ? 0 : 1;
        if (ao != bo) {
          return ao - bo;
        }
        return a.name < b.name ? -1 : 1;
      });
    } else if (this.sortBy == 'closing') {
      // open stores that close soonest first
      list.sort((a, b) => {
        var am = this.minsUntilClose(a);
        var bm = this.minsUntilClose(b);
        if (am != bm) {
          return am - bm;
        }
        return a.name < b.name ? -1 : 1;
      });
    } else {
      list.sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
    }
    this.filtered = list;
  }

  constructor(private el: ElementRef, private http: HttpClient) { }

  selectStore(s: any) {
    this.selected = s;
    this.hoursOpen = false;
    this.cbSent = false;
    this.cbError = '';
    this.loadDetail(s);
    console.log('selected', s.id, s.name);
    this.scrollToStore(s.id);
  }

  scrollToStore(id: number) {
    var host = this.el.nativeElement;
    setTimeout(() => {
      var node = host.querySelector('#store-' + id);
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // on phones the panel is below the list, jump to it
      if (window.innerWidth < 760) {
        var panel = host.querySelector('.panel');
        if (panel) {
          panel.scrollIntoView(true);
        }
      }
    }, 50);
  }

  // titles from the product catalogue, keep in sync by hand
  productName(slug: string) {
    var names: any = {
      'classic-crew-tee': 'Classic Crew Tee',
      'vintage-wash-tee': 'Vintage Wash Tee',
      'essential-pullover-hoodie': 'Essential Pullover Hoodie',
      'zip-up-fleece-hoodie': 'Zip-Up Fleece Hoodie',
      'oversized-logo-hoodie': 'Oversized Logo Hoodie',
      'quilted-hooded-jacket': 'Quilted Hooded Jacket',
      'lightweight-summer-hoodie': 'Lightweight Summer Hoodie',
      'slim-fit-jeans': 'Slim Fit Jeans'
    };
    return names[slug] || slug;
  }

  DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  hoursOpen = false;

  toggleHours() {
    this.hoursOpen = !this.hoursOpen;
  }

  // "Mon-Sat 10:00-20:00, Sun 11:00-17:00"
  parseHours(str: string) {
    var rows: any[] = [];
    for (var k = 0; k < 7; k++) {
      rows.push({ day: this.DAYS[k], closed: true, open: 0, close: 0, label: 'Closed' });
    }
    // ops sheet uses ; for the newer stores
    var segs = str.replace(/;/g, ',').split(',');
    for (var i = 0; i < segs.length; i++) {
      var seg = segs[i].trim();
      var parts = seg.split(' ');
      var dayPart = parts[0];
      var timePart = parts[1];
      var from = dayPart;
      var to = dayPart;
      if (dayPart.indexOf('-') > -1) {
        from = dayPart.split('-')[0];
        to = dayPart.split('-')[1];
      }
      var f = this.DAYS.indexOf(from);
      var t = this.DAYS.indexOf(to);
      for (var d = f; d <= t; d++) {
        if (timePart.toLowerCase() == 'closed') {
          rows[d].closed = true;
          rows[d].label = 'Closed';
        } else {
          var o = timePart.split('-')[0];
          var c = timePart.split('-')[1];
          rows[d].closed = false;
          rows[d].open = parseInt(o.split(':')[0]) * 60 + parseInt(o.split(':')[1]);
          rows[d].close = parseInt(c.split(':')[0]) * 60 + parseInt(c.split(':')[1]);
          if (rows[d].close <= rows[d].open) {
            // closes after midnight
            rows[d].close = rows[d].close + 1440;
          }
          rows[d].label = o + ' - ' + c;
        }
      }
    }
    return rows;
  }

  // bank holidays, update each year
  holidays = ['2024-12-25', '2024-12-26', '2025-01-01', '2025-04-18', '2025-04-21', '2025-12-25'];

  isHoliday(d: Date) {
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();
    var key = y + '-' + (m < 10 ? '0' + m : m) + '-' + (day < 10 ? '0' + day : day);
    return this.holidays.indexOf(key) > -1;
  }

  // the store's own wall clock, from its tz
  storeClock(s: any) {
    var now = new Date();
    var zones: any = {
      'New York': 'America/New_York', 'Chicago': 'America/Chicago', 'Los Angeles': 'America/Los_Angeles',
      'Berlin': 'Europe/Berlin', 'Dublin': 'Europe/Dublin'
    };
    var tz = s.tz || zones[s.city] || 'Europe/London';
    try {
      var parts: any = {};
      new Intl.DateTimeFormat('en-GB', {
        timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(now).forEach(function (p) { parts[p.type] = p.value; });
      var local = new Date(parseInt(parts.year), parseInt(parts.month) - 1, parseInt(parts.day));
      return {
        date: local,
        day: (local.getDay() + 6) % 7,
        mins: parseInt(parts.hour) * 60 + parseInt(parts.minute)
      };
    } catch (e) {
      return { date: now, day: (now.getDay() + 6) % 7, mins: now.getHours() * 60 + now.getMinutes() };
    }
  }

  isOpenNow(s: any) {
    var rows = this.parseHours(s.hours);
    var clk = this.storeClock(s);
    if (this.isHoliday(clk.date) && s.city != 'New York' && s.city != 'Chicago' && s.city != 'Los Angeles') {
      return false;
    }
    var r = rows[clk.day];
    if (r && !r.closed && clk.mins >= r.open && clk.mins < r.close) {
      return true;
    }
    // still inside yesterday's late hours
    var pr = rows[(clk.day + 6) % 7];
    return !!pr && !pr.closed && clk.mins + 1440 < pr.close;
  }

  minsUntilClose(s: any) {
    if (!this.isOpenNow(s)) {
      return 999999;
    }
    var rows = this.parseHours(s.hours);
    var clk = this.storeClock(s);
    var day = clk.day;
    var closeAt = rows[day].close;
    if (rows[day].closed || clk.mins < rows[day].open || clk.mins >= rows[day].close) {
      closeAt = rows[(day + 6) % 7].close;
    }
    return closeAt - clk.mins;
  }

  hoursRows(s: any) {
    var rows = this.parseHours(s.hours);
    var today = this.storeClock(s).day;
    for (var i = 0; i < rows.length; i++) {
      rows[i].today = (i == today);
    }
    return rows;
  }

  fmtMins(m: number) {
    var h = Math.floor(m / 60);
    var mm = m % 60;
    return (h < 10 ? '0' + h : h) + ':' + (mm < 10 ? '0' + mm : mm);
  }

  openLabel(s: any) {
    var rows = this.parseHours(s.hours);
    var clk = this.storeClock(s);
    var day = clk.day;
    var mins = clk.mins;
    if (this.isOpenNow(s)) {
      var closeAt = rows[day].close;
      if (rows[day].closed || mins < rows[day].open || mins >= rows[day].close) {
        closeAt = rows[(day + 6) % 7].close;
      }
      return 'Open now - closes ' + this.fmtMins(closeAt % 1440);
    }
    for (var i = 0; i < 7; i++) {
      var d = (day + i) % 7;
      var rr = rows[d];
      if (rr && !rr.closed) {
        if (i == 0) {
          if (mins < rr.open) {
            return 'Closed - opens today at ' + this.fmtMins(rr.open);
          }
        } else if (i == 1) {
          return 'Closed - opens tomorrow at ' + this.fmtMins(rr.open);
        } else {
          return 'Closed - opens ' + this.DAYS[d] + ' at ' + this.fmtMins(rr.open);
        }
      }
    }
    return 'Closed';
  }

  detail: any = null;
  detailLoading = false;

  loadDetail(s: any) {
    // show what we already have, then swap in the fuller record
    this.detail = s;
    this.detailLoading = true;
    this.http.get<any[]>('assets/stores.json').subscribe(
      (list) => {
        if (!this.selected || this.selected.id != s.id) {
          return;
        }
        var found: any = null;
        for (var i = 0; i < list.length; i++) {
          if (list[i].id == s.id) {
            found = list[i];
          }
        }
        if (found) {
          this.detail = {
            id: found.id,
            name: found.name,
            city: found.city,
            addr: found.address,
            zip: found.postcode,
            phone: found.phone,
            hours: found.hours,
            services: found.services,
            lat: found.latitude,
            lon: found.longitude,
            featuredSlug: found.featured_slug,
            photo: found.photo
          };
        }
        this.detailLoading = false;
      },
      () => {
        this.detailLoading = false;
      }
    );
  }

  cb: any = { name: '', phone: '', email: '', slot: 'morning', topic: 'general', note: '', marketing: false };
  cbSent = false;
  cbBusy = false;
  cbError = '';
  cbRef = '';
  cbHistory: any[] = [];
  slots = [
    { v: 'morning', l: 'Morning (9-12)' },
    { v: 'afternoon', l: 'Afternoon (12-5)' },
    { v: 'evening', l: 'Evening (5-8)' }
  ];
  topics = ['general', 'stock check', 'click & collect', 'alterations', 'returns'];

  submitCallback(f: NgForm) {
    this.cbError = '';
    if (f.invalid) {
      Object.keys(f.controls).forEach(k => f.controls[k].markAsTouched());
      this.cbError = 'Please fill in the highlighted fields';
      return;
    }
    if (this.cbBusy) {
      return;
    }
    this.cbBusy = true;

    var name = this.cb.name.trim();
    var phone = this.cb.phone.trim();
    var email = this.cb.email.trim().toLowerCase();

    // crm wants +country prefix, no spaces
    var digits = phone.replace(/\s+/g, '').replace(/[()-]/g, '');
    var country = 'GB';
    var prefix = '+44';
    if (this.selected.city == 'New York' || this.selected.city == 'Chicago' || this.selected.city == 'Los Angeles') {
      country = 'US';
      prefix = '+1';
    } else if (this.selected.city == 'Berlin') {
      country = 'DE';
      prefix = '+49';
    } else if (this.selected.city == 'Dublin') {
      country = 'IE';
      prefix = '+353';
    }
    if (digits.charAt(0) == '+') {
      // already international, leave it
    } else {
      if (digits.charAt(0) == '0') {
        if (country == 'GB' || country == 'IE' || country == 'DE') {
          digits = prefix + digits.substring(1);
        } else {
          digits = prefix + digits;
        }
      } else {
        if (country == 'US' && digits.length == 10) {
          digits = prefix + digits;
        } else {
          digits = prefix + digits;
        }
      }
    }

    var okNum = /^\+\d{8,15}$/.test(digits);
    if (okNum && digits.indexOf('+1') == 0) {
      okNum = /^\+1[2-9]\d{9}$/.test(digits);
    }
    if (okNum && digits.indexOf('+44') == 0) {
      okNum = /^\+44\d{9,10}$/.test(digits);
    }
    if (!okNum) {
      this.cbBusy = false;
      this.cbError = 'Please enter a valid phone number';
      return;
    }

    // when do we ring them back
    var when = new Date();
    var slotStart = 9;
    var slotEnd = 12;
    if (this.cb.slot == 'afternoon') {
      slotStart = 12;
      slotEnd = 17;
    } else if (this.cb.slot == 'evening') {
      slotStart = 17;
      slotEnd = 20;
    }
    if (when.getHours() >= slotEnd) {
      when.setDate(when.getDate() + 1);
    }
    // sundays are not staffed
    if (when.getDay() == 0) {
      when.setDate(when.getDate() + 1);
    }
    when.setHours(slotStart, 0, 0, 0);

    var payload: any = {
      storeId: this.selected.id,
      storeName: this.selected.name,
      name: name,
      phone: digits,
      email: email,
      topic: this.cb.topic,
      note: this.cb.note,
      callAfter: when.toISOString(),
      country: country
    };
    // legal ticket: only send opt-in when ticked
    if (this.cb.marketing) {
      payload.marketing = true;
    }
    // german store wants german call scripts
    if (country == 'DE') {
      payload.lang = 'de';
    }
    console.log('callback payload', payload);

    // fake send until the crm hook is ready
    setTimeout(() => {
      this.cbBusy = false;
      this.cbSent = true;
      this.cbRef = 'CB-' + (1000 + this.cbHistory.length + 1);
      this.cbHistory.push(payload);
      f.resetForm({ slot: 'morning', topic: 'general', marketing: false });
      this.cb = { name: '', phone: '', email: '', slot: 'morning', topic: 'general', note: '', marketing: false };
    }, 800);
  }

  newCallback() {
    this.cbSent = false;
  }

  // old filter, replaced by doFilter
  // filterCities(q: string) {
  //   return this.stores.filter(s => s.city.toLowerCase() == q.toLowerCase());
  // }

  trackById(i: number, s: any) {
    return s.id;
  }

  // used by the map embed that never shipped
  mapUrl(s: any) {
    return 'https://maps.example.com/embed?q=' + s.lat + ',' + s.lon;
  }

}
