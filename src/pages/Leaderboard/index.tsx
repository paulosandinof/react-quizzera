import React, { useState, useCallback, useEffect } from 'react';

import { users_api } from '../../services/api';

import Navbar from '../../components/Navbar';

import {
  FilterContainer,
  Filter,
  Order,
  Content,
  LeaderboardContainer,
  LeaderboardHeader,
  LeaderboardItem,
} from './styles';

interface LeaderboardState {
  rank: number;
  name: string;
  score: number;
  time_to_finish: number;
}

interface Response {
  name: string;
  score: number;
  time_to_finish: number;
}

const Leaderboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('score');
  const [filterOrder, setFilterOrder] = useState('desc');
  const [leaderboard, setLeaderboard] = useState<LeaderboardState[]>([]);

  const handleChangeSelectedFilter = useCallback(event => {
    setSelectedFilter(event.target.value);
  }, []);

  const handleChangeFilterOrder = useCallback(event => {
    setFilterOrder(event.target.value);
  }, []);

  useEffect(() => {
    users_api
      .get('/users', {
        params: {
          _sort: selectedFilter,
          _order: filterOrder,
        },
      })
      .then(response => {
        const formattedRank = response.data.map(
          (item: Response, index: number) => {
            return {
              rank: index + 1,
              name: item.name,
              score: item.score,
              time_to_finish: item.time_to_finish,
            };
          },
        );

        setLeaderboard(formattedRank);
      });
  }, [selectedFilter, filterOrder]);

  return (
    <>
      <Navbar />

      <FilterContainer>
        <Filter onChange={handleChangeSelectedFilter} value={selectedFilter}>
          <option value="score">Score</option>
          <option value="time_to_finish">Time to finish</option>
        </Filter>
        <Order onChange={handleChangeFilterOrder} value={filterOrder}>
          <option value="asc">Ascendant</option>
          <option value="desc">Descendant</option>
        </Order>
      </FilterContainer>

      <Content>
        <LeaderboardContainer>
          <LeaderboardHeader>
            <span>Rank</span>
            <span>Name</span>
            <span>Score</span>
            <span>Finish Time</span>
          </LeaderboardHeader>
          {leaderboard.map(item => (
            <LeaderboardItem key={item.rank}>
              <strong>{item.rank}</strong>
              <span>{item.name}</span>
              <span>{item.score}</span>
              <span>{`${item.time_to_finish}s`}</span>
            </LeaderboardItem>
          ))}
        </LeaderboardContainer>
      </Content>
    </>
  );
};

export default Leaderboard;
