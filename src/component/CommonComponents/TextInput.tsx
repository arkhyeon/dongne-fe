import React, { DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes, ReactElement } from 'react';
import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { DeepMap, FieldError, Path, RegisterOptions } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
export const TextInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const enterEvent = e => {
    if (e.key === 'Enter' && props.enterEvent) {
      props.enterEvent();
    }
  };
  return (
    <TextInputWrap>
      <label htmlFor={props.label}>{props.label}</label>
      <TextInputComp
        id={props.label}
        type="text"
        {...props}
        ref={ref}
        onKeyDown={e => enterEvent(e)}
      />
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
    display: flex;
    gap: 5px;
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

export const DataListInput = forwardRef((props, ref) => {
  return (
    <TextInputWrap>
      <label htmlFor={props.id}>{props.id}</label>
      <TextInputComp ref={ref} {...props} />
    </TextInputWrap>
  );
});

DataListInput.displayName = 'DataListInput';

type InputProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
  enterEvent?: () => void;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  ...props
}: FormInputProps<TFormValues>): ReactElement => {
  if (!name) {
    throw new Error('FormInput Must Have Name Parameter');
  }

  return (
    <TextInputWrap>
      <label htmlFor={props.id}>
        {props.label}
        {errors && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="error-text" role="alert">
                {message}
              </p>
            )}
          />
        )}
      </label>
      <TextInputComp type="text" {...props} {...(register && register(name, rules))} />
    </TextInputWrap>
  );
};
