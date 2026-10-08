import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { StoreLocatorComponent } from './store-locator.component';
import { CitySearchComponent } from './city-search.component';

describe('StoreLocatorComponent', () => {
  let comp: StoreLocatorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [StoreLocatorComponent, CitySearchComponent],
      providers: [provideHttpClient()]
    }).compileComponents();
    const cmpRef = TestBed.createComponent(StoreLocatorComponent);
    comp = cmpRef.componentInstance;
    comp.ngOnInit();
  });

  it('has 15 stores', () => {
    expect(comp.stores.length).toBe(15);
    expect(comp.filtered.length).toBe(15);
  });

  it('filters by city', () => {
    comp.searchText = 'london';
    comp.doFilter();
    expect(comp.filtered.length).toBe(2);
    expect(comp.filtered[0].name).toBe('Oxford Street Flagship');
  });

  it('filters by postcode', () => {
    comp.searchText = 'm4 3aq';
    comp.doFilter();
    expect(comp.filtered.length).toBe(1);
  });

  it('parses weekday hours', () => {
    const rows = comp.parseHours('Mon-Sat 10:00-20:00, Sun 11:00-17:00');
    expect(rows[0].open).toBe(600);
    expect(rows[5].close).toBe(1200);
    expect(rows[6].label).toBe('11:00 - 17:00');
  });

  it('knows when the flagship is open', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 2, 12, 12, 0, 0)));
    expect(comp.isOpenNow(comp.stores[0])).toBe(true);
    vi.useRealTimers();
  });

  it('returns a boolean for open now', () => {
    expect(typeof comp.isOpenNow(comp.stores[2])).toBe('boolean');
  });

  it('keeps a store open past midnight', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 2, 15, 1, 0, 0)));
    expect(comp.isOpenNow(comp.stores[1])).toBe(true);
    expect(comp.openLabel(comp.stores[1])).toBe('Open now - closes 02:00');
    vi.setSystemTime(new Date(Date.UTC(2025, 2, 15, 23, 30, 0)));
    expect(comp.isOpenNow(comp.stores[3])).toBe(true);
    expect(comp.openLabel(comp.stores[3])).toBe('Open now - closes 00:00');
    vi.useRealTimers();
  });

  it('reads the clock in the store timezone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(Date.UTC(2025, 2, 12, 1, 0, 0)));
    const ny = comp.stores.find((x: any) => x.id == 10);
    expect(comp.isOpenNow(ny)).toBe(true);
    vi.setSystemTime(new Date(Date.UTC(2025, 2, 12, 12, 0, 0)));
    expect(comp.isOpenNow(ny)).toBe(false);
    vi.useRealTimers();
  });

  it('builds callback numbers or refuses them', () => {
    vi.useFakeTimers();
    const form: any = { invalid: false, controls: {}, resetForm: () => {} };
    comp.selected = comp.stores.find((x: any) => x.id == 10);
    const send = (phone: string) => {
      comp.cb = { name: 'A', phone: phone, email: '', slot: 'morning', topic: 'general', note: '', marketing: false };
      comp.cbBusy = false;
      comp.cbHistory = [];
      comp.submitCallback(form);
      vi.advanceTimersByTime(1000);
      return comp.cbHistory.length ? comp.cbHistory[0].phone : comp.cbError;
    };
    expect(send('(212) 555-0114')).toBe('+12125550114');
    expect(send('0212 555 0114')).toBe('Please enter a valid phone number');
    expect(send('call me')).toBe('Please enter a valid phone number');
    comp.selected = comp.stores[0];
    expect(send('020 7946 0100')).toBe('+442079460100');
    vi.useRealTimers();
  });
});
