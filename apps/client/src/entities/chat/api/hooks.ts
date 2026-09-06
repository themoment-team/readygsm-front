import { useMutation } from '@tanstack/react-query';

import { type ApiResponseType, post } from '@shared/api';

import type { ChatSessionType } from '../model/types';
import { chatUrl } from './chatUrl';

export const usePostChatSession = () =>
  useMutation({
    mutationFn: () => post<ApiResponseType<ChatSessionType>>(chatUrl.postChatSession()),
  });
