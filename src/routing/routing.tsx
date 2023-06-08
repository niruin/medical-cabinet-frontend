import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { App } from '../App';
import { Profile } from '../pages/profile';
import { Spinner } from '../shared/ui';
import { Users } from '../pages/users';
import { Schedule } from '../pages/schedule';
import { AuthRouting } from './auth';
import { useAuth } from '../services/auth';

export const Routing = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <AuthRouting />;
  }

  return (
    <Suspense fallback={<Spinner style={{ position: 'absolute', top: '50%', left: '50%' }} />}>
      <Routes>
        <Route path="/" element={<Navigate replace to={'/profile'} />} />
        <Route path="/" element={<App />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path={'*'} element={<Navigate replace to={'/profile'} />} />
      </Routes>
    </Suspense>
  );
};
