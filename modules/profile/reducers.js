import typeToReducer from 'type-to-reducer'

import {
  openProfilePopup,
  closePopup,
  openChangePasswordPopup,
  closeChangePasswordPopup,
  getUserMeData,
  getCurrencies,
  updateMyProfile,
  changePassword,
  setPreferredLanguage,
  loadFile,
  saveAvatarPicture,
  deleteAvatarPicture
} from './actions'

export const initialState = {
  usersMe: null,
  currency: null,
  loading: false,
  profilePopup: false,
  changePasswordPopup: false,
  savingAvatarPicture: false
}

export default typeToReducer(
  {
    [openProfilePopup]: state => ({
      ...state,
      profilePopup: true
    }),
    [closePopup]: state => ({
      ...state,
      profilePopup: false
    }),
    [openChangePasswordPopup]: state => ({
      ...state,
      changePasswordPopup: true
    }),
    [closeChangePasswordPopup]: state => ({
      ...state,
      changePasswordPopup: false,
      loading: false
    }),
    [getUserMeData.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [getUserMeData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        usersMe: payload,
        loading: false
      }
    },
    [getUserMeData.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [getCurrencies.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [getCurrencies.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        currency: payload,
        loading: false
      }
    },
    [getCurrencies.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [updateMyProfile.pending]: state => {
      return {
        ...state
      }
    },
    [updateMyProfile.fulfilled]: state => {
      return {
        ...state,
        profilePopup: false
      }
    },
    [updateMyProfile.rejected]: state => {
      return {
        ...state
      }
    },
    [changePassword.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [changePassword.fulfilled]: state => {
      return {
        ...state,
        changePasswordPopup: false,
        loading: false
      }
    },
    [changePassword.rejected]: state => {
      return {
        ...state,
        changePasswordPopup: false,
        loading: false
      }
    },
    [setPreferredLanguage.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [setPreferredLanguage.fulfilled]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [setPreferredLanguage.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [loadFile.pending]: state => {
      return {
        ...state
      }
    },
    [loadFile.fulfilled]: state => {
      return {
        ...state
      }
    },
    [loadFile.rejected]: state => {
      return {
        ...state
      }
    },
    [saveAvatarPicture.pending]: state => {
      return {
        ...state,
        savingAvatarPicture: true
      }
    },
    [saveAvatarPicture.fulfilled]: state => {
      return {
        ...state,
        savingAvatarPicture: false
      }
    },
    [saveAvatarPicture.rejected]: state => {
      return {
        ...state,
        savingAvatarPicture: false
      }
    },
    [deleteAvatarPicture.pending]: state => {
      return {
        ...state,
        savingAvatarPicture: true
      }
    },
    [deleteAvatarPicture.fulfilled]: state => {
      return {
        ...state,
        savingAvatarPicture: false
      }
    },
    [deleteAvatarPicture.rejected]: state => {
      return {
        ...state,
        savingAvatarPicture: false
      }
    }
    
  },

  initialState
)
