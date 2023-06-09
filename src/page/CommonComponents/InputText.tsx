import styled from '@emotion/styled';

export function HeaderInput(props) {
  return <HeaderSearch type="text" {...props} />;
}

const InputText = styled.input``;

const HeaderSearch = styled(InputText)`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
`;
