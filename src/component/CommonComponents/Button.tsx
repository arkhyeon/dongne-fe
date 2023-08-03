import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

export function SearchButton(props) {
  const children = props.children;
  return (
    <SearchBtn type="button" {...props}>
      {children}
    </SearchBtn>
  );
}

type MainButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function MainButton(props: MainButtonProps) {
  const children = props.children;
  return (
    <MainBtn type="button" {...props}>
      {children}
    </MainBtn>
  );
}

export function SubButton(props) {
  const children = props.children;
  return (
    <SubBtn type="button" {...props}>
      {children}
    </SubBtn>
  );
}

const Button = styled.button`
  cursor: pointer;
`;

const SearchBtn = styled(Button)`
  width: 60px;
  display: flex;
  gap: 3px;
  align-items: center;
  background-color: white;
  border: none;
  color: #525252;

  & svg {
    font-size: 20px;
    position: relative;
    top: 1px;
  }
`;

const MainBtn = styled(Button)`
  width: 100px;
  border-radius: 5px;
  border: none;
  background-color: #ffc045;

  &:hover {
    background-color: #fab631;
    transition: 0.3s;
  }
`;

const SubBtn = styled(Button)`
  width: 100px;
  border-radius: 5px;
  border: 1px solid #aaa;
  background-color: white;

  &:hover {
    background-color: #fafafa;
    transition: 0.3s;
  }
`;

SearchButton.propTypes = {
  children: PropTypes.node.isRequired,
};

MainButton.propTypes = {
  children: PropTypes.node.isRequired,
};

SubButton.propTypes = {
  children: PropTypes.node.isRequired,
};
