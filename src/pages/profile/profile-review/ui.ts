import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  font-size: 18px;
  letter-spacing: 0.3px;

  & .title {
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: bold;
  }

  & .box-item {
    padding: 12px 0;
    border-top: 1px solid var(--main-bg);
    display: flex;
    justify-content: space-between;

    &__value {
      font-weight: 600;

      &--light {
        font-weight: 400;
        font-size: 14px;
        color: #494646;
      }
    }

    &:nth-last-of-type(1) {
      border-bottom: 1px solid var(--main-bg);
    }
  }
`;
