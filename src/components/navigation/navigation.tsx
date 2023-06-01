import React, { useMemo } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useLocation, useNavigate } from 'react-router-dom';

import { tabItems } from './constants';
import { isPermitted } from '../../shared/handlers/permission-handler';
import { useUser } from '../../services/user';
import { TabItem } from './types';

export const Navigation = () => {
  const { pathname } = useLocation();
  const [value, setValue] = React.useState(() => {
    switch (pathname) {
      case tabItems[0].link:
        return 0;
      case tabItems[1].link:
        return 1;
      case tabItems[2].link:
        return 2;
    }
  });
  const { profile } = useUser();
  const navigate = useNavigate();

  if (!profile) {
    return null;
  }

  const handleClickTab = (link: string) => {
    navigate({ pathname: link });
  };

  const isCheck = (tab: TabItem) => {
    const { title, permittedRoles, link, icon } = tab;

    if (!isPermitted(profile.role, permittedRoles)) return null;

    return (
      <BottomNavigationAction
        label={title}
        key={link}
        icon={<NavIcon icon={icon} />}
        onClick={() => handleClickTab(link)}
      />
    );
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      {tabItems.map((tab) => isCheck(tab))}
    </BottomNavigation>
  );
};

const NavIcon = ({ icon }: { icon: React.ElementType }) => {
  const Icon = useMemo(() => icon, [icon]);

  return <Icon />;
};
