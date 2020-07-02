import styled from 'styled-components';

export const NavbarText = styled.div`
  display: flex;
  align-items: center;

  font-size: 34px;
  color: white;
`;

export const NavbarLink = styled.a`
  margin-left: auto;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
`;

export const CategorySelector = styled.select`
  height: 30px;
  border-radius: 5px;
`;

export const DifficultySelector = styled.select`
  height: 30px;
  border-radius: 5px;
  margin-left: 10px;
`;

export const QuantitySelector = styled.select`
  height: 30px;
  border-radius: 5px;
  margin-left: 10px;
`;

export const NameContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 20px;

  button {
    margin-left: 10px;
    padding: 3px;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

  button {
    margin-top: 14px;
    font-size: 24px;
    padding: 3px;
    border-radius: 5px;
  }
`;

export const QuestionContainer = styled.div`
  width: 700px;
  margin-top: 30px;
`;

export const QuestionTitle = styled.div`
  font-size: 24px;
`;

export const QuestionAnswers = styled.div`
  display: flex;
  align-items: center;
  margin-left: 14px;

  label {
    margin-left: 5px;
  }
`;
