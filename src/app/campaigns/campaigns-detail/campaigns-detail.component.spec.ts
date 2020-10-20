import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsDetailComponent } from './campaigns-detail.component';

describe('CampaignsDetailComponent', () => {
  let component: CampaignsDetailComponent;
  let fixture: ComponentFixture<CampaignsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
