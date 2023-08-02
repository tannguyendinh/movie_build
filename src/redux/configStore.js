import { configureStore } from '@reduxjs/toolkit';
import nguoiDungSlice from './slices/nguoiDungSlice';
import loadingSlice from './slices/loadingSlice';
import  QuanLyDatVeReDucer  from './reducers/QuanLyDatVeReducer';


export const store = configureStore({
  reducer: {
    nguoiDung: nguoiDungSlice,
    loading: loadingSlice,
    QuanLyDatVeReDucer,

  },
});
