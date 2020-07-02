import React, { useState, useCallback, useEffect } from 'react';

import { users_api } from '../../services/api';

import Navbar from '../../components/Navbar';

import { FilterContainer, Filter, Order } from './styles';

const Leaderboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('score');
  const [filterOrder, setFilterOrder] = useState('asc');

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
        console.log(response.data);
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
    </>
  );
};

export default Leaderboard;
