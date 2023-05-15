import React from 'react';

import { ProfilePatch } from '../../services/user/types';

export type UserProfileProps = {
  profile: ProfilePatch;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
