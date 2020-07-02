import React from 'react';
import { Link } from 'react-router-dom';

import { NavbarContainer, NavbarOptions } from './styles';

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <NavbarOptions>
        <Link to="/">Quizzera</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </NavbarOptions>
    </NavbarContainer>
  );
};

export default Navbar;
