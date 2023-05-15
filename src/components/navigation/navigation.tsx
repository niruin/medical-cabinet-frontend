import React, { useMemo } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';

import { tabItems } from './constants';
import { isPermitted } from '../../shared/handlers/permission-handler';
import { useUser } from '../../services/user';
import { TabItem } from './types';

export const Navigation = () => {
  const [value, setValue] = React.useState(0);
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
