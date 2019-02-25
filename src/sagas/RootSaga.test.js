import { takeEvery, put, call, delay } from 'redux-saga/effects';

import * as profileActions from '../actions/ProfileActions';

jest.mock('../services/ProfileApiService', () => ({
  getProfile: jest.fn(),
  patchProfile: jest.fn(),
  postProfilePhoto: jest.fn(),
  deleteProfilePhoto: jest.fn(),
  getUserPreference: jest.fn(),
}));

// RootSaga and ProfileApiService must be imported AFTER the mock above.
/* eslint-disable import/first */
import rootSaga, {
  handleFetchProfile,
  handleSaveProfile,
  handleSaveProfilePhoto,
  handleDeleteProfilePhoto,
} from './RootSaga';
import * as ProfileApiService from '../services/ProfileApiService';
/* eslint-enable import/first */

describe('RootSaga', () => {
  describe('rootSaga', () => {
    it('should pass actions to the correct sagas', () => {
      const gen = rootSaga();

      expect(gen.next().value).toEqual(takeEvery(profileActions.FETCH_PROFILE.BASE, handleFetchProfile)); // eslint-disable-line
      expect(gen.next().value).toEqual(takeEvery(profileActions.SAVE_PROFILE.BASE, handleSaveProfile)); // eslint-disable-line
      expect(gen.next().value).toEqual(takeEvery(profileActions.SAVE_PROFILE_PHOTO.BASE, handleSaveProfilePhoto)); // eslint-disable-line
      expect(gen.next().value).toEqual(takeEvery(profileActions.DELETE_PROFILE_PHOTO.BASE, handleDeleteProfilePhoto)); // eslint-disable-line

      expect(gen.next().value).toBeUndefined();
    });
  });

  describe('handleSaveProfile', () => {
    it('should successfully process a saveProfile request if there are no exceptions', () => {
      const action = profileActions.saveProfile(
        'my username',
        {
          profileData: {
            fullName: 'Full Name',
            education: 'b',
          },
          preferencesData: null,
        },
        'ze field',
      );
      const gen = handleSaveProfile(action);
      const profile = {
        name: 'Full Name',
        levelOfEducation: 'b',
      };
      expect(gen.next().value).toEqual(put(profileActions.saveProfileBegin()));
      expect(gen.next().value).toEqual(call(ProfileApiService.patchProfile, 'my username', action.payload.profileData));
      // The library would supply the result of the above call
      // as the parameter to the NEXT yield.  Here:
      expect(gen.next(profile).value).toEqual(put(profileActions.saveProfileSuccess()));
      expect(gen.next().value).toEqual(put(profileActions.fetchProfileSuccess(profile)));
      expect(gen.next().value).toEqual(delay(300));
      expect(gen.next().value).toEqual(put(profileActions.closeField('ze field')));
      expect(gen.next().value).toEqual(delay(300));
      expect(gen.next().value).toEqual(put(profileActions.saveProfileReset()));
      expect(gen.next().value).toBeUndefined();
    });

    it('should successfully publish a failure action on exception', () => {
      const error = new Error('uhoh');
      const action = profileActions.saveProfile(
        'my username',
        {
          fullName: 'Full Name',
          education: 'b',
        },
        'ze field',
      );
      const gen = handleSaveProfile(action);

      expect(gen.next().value).toEqual(put(profileActions.saveProfileBegin()));
      const result = gen.throw(error);
      expect(result.value).toEqual(put(profileActions.saveProfileFailure('uhoh')));
      expect(gen.next().value).toBeUndefined();
    });
  });
});
