import { NavigateFunction } from 'react-router-dom';

import { ToastSeverityType } from '../ui';

export type UseMutationParams = {
  navigate?: NavigateFunction;
  returnUrl?: string;
  returnErrorUrl?: string;

  enableNavigate?: boolean;
  enableErrorNavigate?: boolean;
  enableToast?: boolean;
  customMessageToast?: string;
  customMessageErrorToast?: string;

  customOnSuccess?: (resData: unknown) => void;
  customOnError?: (error: unknown) => void;
  customMessageErrorSeverityToast?: ToastSeverityType;
  customMessageSuccessSeverityToast?: ToastSeverityType;
};

export interface UseFetchEnabledParams<T> {
  enabled?: boolean;
  params?: T;
}

export type PhotosDBJSONType = {
  photoUrl: string;
  photoName: string;
  photoId: number;
};

export type ChangeModelStateData = {
  state: boolean;
};

export type PagingPartialParams = {
  page?: number;
  page_size?: number;

  filterByState?: boolean;
};
