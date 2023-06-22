import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export function SearchButton(props) {
  const children = props.children;
  return (
    <SearchBtn type="button" {...props}>
      {children}
    </SearchBtn>
  );
}

export function MainButton(props) {
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

const Button = styled.button``;

const SearchBtn = styled(Button)`
  width: 60px;
  display: flex;
  gap: 3px;
  align-items: center;
  background-color: white;
  border: none;
  color: #525252;
  cursor: pointer;

  & svg {
    font-size: 20px;
    position: relative;
    top: 1px;
  }
`;

const MainBtn = styled(Button)`
  width: 100px;
  border-radius: 10px;
  border: 1px solid #0a91ab;
`;

const SubBtn = styled(Button)`
  width: 100px;
  border-radius: 10px;
  border: 1px solid #aaa;
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
