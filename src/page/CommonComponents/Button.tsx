import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export function MainButton(props) {
  const children = props.children;
  return (
    <MainBtn type="button" {...props}>
      {children}
    </MainBtn>
  );
}

const Button = styled.button``;

const MainBtn = styled(Button)`
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

MainButton.propTypes = {
  children: PropTypes.node.isRequired,
};
