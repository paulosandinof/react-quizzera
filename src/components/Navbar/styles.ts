import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;

  background: #1b264f;
  height: 75px;
  width: 100%;
`;

export const NavbarOptions = styled.div`
  display: flex;
  justify-content: center;
  width: 700px;

  > a {
    display: flex;
    align-items: center;

    text-decoration: none;

    font-size: 34px;
    color: white;
  }

  a + a {
    font-size: 20px;
    margin-left: auto;
  }
`;
