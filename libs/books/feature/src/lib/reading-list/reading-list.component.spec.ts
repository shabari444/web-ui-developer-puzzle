import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {createReadingListItem, SharedTestingModule} from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import {addToReadingList, getReadingList, removeFromReadingList} from "@tmo/books/data-access";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {OverlayContainer} from "@angular/cdk/overlay";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: MockStore;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let dispatchSpy: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, NoopAnimationsModule],
      providers: [provideMockStore({ initialState: { items: {} } })]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store.overrideSelector(getReadingList, []);
    fixture.detectChanges();
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove book from reading list and trigger UNDO action', () => {
    const book = createReadingListItem('B');
    component.removeFromReadingList(book);
    expect(store.dispatch).toHaveBeenCalledWith(removeFromReadingList({ item: book }));
    const buttonElement: HTMLElement = overlayContainerElement.querySelector('.mat-simple-snackbar-action > button');
    buttonElement?.click();
    expect(dispatchSpy).toHaveBeenCalledWith(addToReadingList({book: {...book, id: 'B'}}));
  });
});
