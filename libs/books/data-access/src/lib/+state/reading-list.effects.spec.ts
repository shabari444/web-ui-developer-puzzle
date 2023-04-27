import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import {createReadingListItem, SharedTestingModule} from '@tmo/shared/testing';
import { ReadingListEffects } from './reading-list.effects';
import * as ReadingListActions from './reading-list.actions';

describe('ToReadEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: ReadingListEffects;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestingModule],
      providers: [
        ReadingListEffects,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(ReadingListEffects);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('loadReadingList$', () => {
    it('should work', done => {
      actions = new ReplaySubject();
      actions.next(ReadingListActions.init());

      effects.loadReadingList$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.loadReadingListSuccess({ list: [] })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list').flush([]);
    });

    it('should check confirmedMarkAsRead has been invoked when markAsRead gets success', done => {
      actions = new ReplaySubject();
      const item = createReadingListItem('A');
      actions.next(ReadingListActions.markedAsRead({ item }));

      effects.markedAsRead$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.confirmedMarkAsRead({
            item
          })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list/A/finished').flush(item);
    });

    it('should check failedMarkAsRead has been invoked when markAsRead gets failed', done => {
      actions = new ReplaySubject();
      const item = createReadingListItem('B');
      actions.next(ReadingListActions.markedAsRead({ item }));

      effects.markedAsRead$.subscribe(action => {
        expect(action).toEqual(
          ReadingListActions.failedMarkAsRead({ item })
        );
        done();
      });

      httpMock.expectOne('/api/reading-list/B/finished').error(new ErrorEvent('Error'));
    });

  });
});
