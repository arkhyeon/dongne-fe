import styled from '@emotion/styled';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const SearchButton = (props: ButtonProps) => {
  const children = props.children;
  return <SearchBtn {...props}>{children}</SearchBtn>;
};

export const MainButton = (props: ButtonProps) => {
  const children = props.children;
  return <MainBtn {...props}>{children}</MainBtn>;
};

export const SubButton = (props: ButtonProps) => {
  const children = props.children;
  return <SubBtn {...props}>{children}</SubBtn>;
};

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
