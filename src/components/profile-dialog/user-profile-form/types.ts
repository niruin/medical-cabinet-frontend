import { ProfilePatch } from '../../../services/user/types';

export type UserProfileProps = {
  profile: ProfilePatch;
  modeAdmin?: boolean;
  onChange?: (name?: string, value?: string) => void;
};
