import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 18px;
  letter-spacing: 0.3px;
  padding: 30px;
  box-sizing: border-box;
  width: 480px;

  & .text-sm {
    font-size: 14px;
  }

  & .text-me {
    font-size: 16px;
  }

  & .text-bold {
    font-weight: 600;
  }

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
