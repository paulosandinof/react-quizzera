import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
`;

export const Filter = styled.select`
  height: 30px;
  border-radius: 5px;
`;

export const Order = styled.select`
  height: 30px;
  border-radius: 5px;
  margin-left: 10px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
`;

export const LeaderboardContainer = styled.div`
  width: 700px;
  margin-top: 30px;
`;

export const LeaderboardHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;

  > span {
    font-size: 24px;
  }
`;

export const LeaderboardItem = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & + & {
    margin-top: 30px;
  }

  > strong {
    font-size: 24px;
  }
`;
