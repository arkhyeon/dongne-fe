import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

export const TextInput = forwardRef(props => {
  console.log(props);
  return (
    <TextInputWrap>
      <label htmlFor={props.label}>{props.label}</label>
      <TextInputComp id={props.label} type="text" {...props} ref={props.inputRef} />
    </TextInputWrap>
  );
});

TextInput.displayName = 'TextInput';

const TextInputWrap = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  & label {
    font-size: 14px;
  }
`;

const TextInputComp = styled.input`
  width: 100%;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ccc;
  padding: 8px 40px 8px 12px;

  &:active,
  &:focus {
    border-color: #aaa;
  }
`;

export default TextInput;

export const DataListInput = forwardRef(props => {
  const enterEvent = e => {
    if (e.key === 'Enter' && props.enterEvent) {
      props.enterEvent();
    }
  };
  return (
    <TextInputWrap>
      <label htmlFor={props.id}>{props.id}</label>
      <TextInputComp ref={props.inputRef} {...props} />
    </TextInputWrap>
  );
});

DataListInput.displayName = 'DataListInput';

export const FormInput = props => {
  return (
    <TextInputWrap>
      <label htmlFor={props.label}>{props.label}</label>
      <TextInputComp type="text" {...props} {...props.reg} />
    </TextInputWrap>
  );
};
