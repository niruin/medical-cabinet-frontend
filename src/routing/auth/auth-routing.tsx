import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Auth } from '../../pages/auth';

export const AuthRouting = () => {
  return (
    <Routes>
      <Route path={'/login'} element={<Auth />} />
      <Route path={'/registration'} element={<Auth />} />
      <Route path={'*'} element={<Navigate to={'/login'} />} />
    </Routes>
  );
};
