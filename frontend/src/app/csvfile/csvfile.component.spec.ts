import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvfileComponent } from './csvfile.component';

describe('CsvfileComponent', () => {
  let component: CsvfileComponent;
  let fixture: ComponentFixture<CsvfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
