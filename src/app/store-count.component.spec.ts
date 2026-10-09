import { TestBed } from '@angular/core/testing';
import { StoreCountComponent } from './store-count.component';

describe('StoreCountComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreCountComponent]
    }).compileComponents();
  });

  it('should create', () => {
    const cmpRef = TestBed.createComponent(StoreCountComponent);
    expect(cmpRef.componentInstance).toBeTruthy();
  });

  it('shows the shown and total counts', () => {
    const cmpRef = TestBed.createComponent(StoreCountComponent);
    cmpRef.componentInstance.shown = 3;
    cmpRef.componentInstance.total = 15;
    cmpRef.detectChanges();
    const compiled = cmpRef.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Showing 3 of 15 stores');
  });
});
