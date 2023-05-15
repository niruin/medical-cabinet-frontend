import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledBoxForm = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--main-form);
  padding: 32px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
`;
