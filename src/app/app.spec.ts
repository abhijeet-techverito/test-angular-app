import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';
import { StoreLocatorComponent } from './store-locator.component';
import { CitySearchComponent } from './city-search.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        App,
        StoreLocatorComponent,
        CitySearchComponent
      ],
      providers: [provideHttpClient()]
    }).compileComponents();
  });

  it('should create the app', () => {
    const cmpRef = TestBed.createComponent(App);
    const app = cmpRef.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const cmpRef = TestBed.createComponent(App);
    cmpRef.detectChanges();
    const compiled = cmpRef.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Find a store');
  });
});
