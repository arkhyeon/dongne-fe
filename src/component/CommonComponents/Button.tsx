import styled from '@emotion/styled';
import React, { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const SearchButton = (props: ButtonProps) => {
  const children = props.children;
  return <SearchBtn {...props}>{children}</SearchBtn>;
};

export const MainButton = forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const children = props.children;
    return (
      <MainBtn {...props} ref={ref}>
        {children}
      </MainBtn>
    );
  },
);

MainButton.displayName = 'MainButton';

export const SubButton = forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const children = props.children;
    return (
      <SubBtn {...props} ref={ref}>
        {children}
      </SubBtn>
    );
  },
);

SubButton.displayName = 'SubButton';

const Button = styled.button`
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 5px;
`;

const SearchBtn = styled(Button)`
  width: 60px;
  padding: 0;
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
  border: none;
  background-color: #ffc045;

  &:hover {
    background-color: #fab631;
    transition: 0.3s;
  }
`;

const SubBtn = styled(Button)`
  border: 1px solid #aaa;
  background-color: white;

  &:hover {
    background-color: #fafafa;
    transition: 0.3s;
  }
`;
