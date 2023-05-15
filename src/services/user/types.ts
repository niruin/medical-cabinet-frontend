import { ProfileResponseData } from '../api';

export type ProfilePatch = Omit<ProfileResponseData, 'roleId' | 'createdAt' | 'updatedAt' | 'id'>;
