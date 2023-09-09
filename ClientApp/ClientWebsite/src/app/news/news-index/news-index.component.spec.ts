import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsIndexComponent } from './news-index.component';

describe('NewsIndexComponent', () => {
  let component: NewsIndexComponent;
  let fixture: ComponentFixture<NewsIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsIndexComponent]
    });
    fixture = TestBed.createComponent(NewsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
