import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserViewComponent } from './user-view.component';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { User } from '../../../interface/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;
  let loader: HarnessLoader;

  const mockUser: User = {
    id: 1,
    name: 'Kunal Mahajan',
    city: 'Lucknow',
    email: 'kunalmahajan@gmail.com',
    mobile: '9088999987',
    country: 'INDIA',
    age: '28'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatProgressSpinnerModule],
      declarations: [UserViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display user details correctly when user is defined', async () => {
    component.user = mockUser;
    fixture.detectChanges();
    await fixture.whenStable();

    const cardHarnesses = await loader.getAllHarnesses(MatCardHarness);
    expect(cardHarnesses.length).toBe(5);

    const cards = await Promise.all(cardHarnesses.map(async (card) => ({
      title: await card.getTitleText(),
      content: await card.getText()
    })));

    const nameCard = cards.find(card => card.title === 'Full Name');
    expect(nameCard).toBeDefined();
    expect(nameCard?.content).toContain(mockUser.name);

    const ageCard = cards.find(card => card.title === 'Age');
    expect(ageCard).toBeDefined();
    expect(ageCard?.content).toContain(mockUser.age);

    const emailCard = cards.find(card => card.title === 'Email');
    expect(emailCard).toBeDefined();
    expect(emailCard?.content).toContain(mockUser.email);

    const phoneCard = cards.find(card => card.title === 'Phone');
    expect(phoneCard).toBeDefined();
    expect(phoneCard?.content).toContain(mockUser.mobile);

    const addressCard = cards.find(card => card.title === 'Address');
    expect(addressCard).toBeDefined();
    expect(addressCard?.content).toContain(`${mockUser.city}, ${mockUser.country}`);
  });

  it('should display loading spinner when user is undefined', async () => {
    component.user = undefined;
    fixture.detectChanges();
    await fixture.whenStable();

    const spinner = await loader.getAllHarnesses(MatProgressSpinnerHarness);
    expect(spinner.length).toBe(1);

    const loadingText = fixture.nativeElement.querySelector('.loading-container p');
    expect(loadingText.textContent).toContain('Loading user details...');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
