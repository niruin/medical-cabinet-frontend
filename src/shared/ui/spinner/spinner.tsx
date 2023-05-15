import { CSSProperties } from 'react';

import { StyledSpinner } from './ui';

type SpinnerProps = {
  style?: CSSProperties;
};

export const Spinner = (props: SpinnerProps) => (
  <StyledSpinner viewBox="0 0 50 50" {...props}>
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
  </StyledSpinner>
);
