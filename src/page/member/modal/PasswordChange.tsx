import Modal, { ModalType } from '../../../component/modal/Modal.tsx';
import { MainButton, SubButton } from '../../../component/CommonComponents/Button.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../../component/CommonComponents/TextInput.tsx';
import styled from '@emotion/styled';
import { client } from '../../../common/axios.ts';
import { UserStore } from '../../../store/UserStore.ts';
import axios from 'axios';
import { DC } from '../../../store/ToastStore.ts';

function PasswordChange({ open, handleClose }: ModalType) {
  const { UserInfo } = UserStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    console.log(data);

    try {
      await client.post(`user-password/confirm/${UserInfo.userId}`, {
        password: data.password_before,
      });

      await client.patch(`user-password/${UserInfo.userId}`, { password: data.password });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.responseMessage === 'Incorrect Password') {
          setError('password_before', { message: '현재 비밀번호를 다시 확인해 주세요.' });
        } else if (error.response.data.responseMessage === 'Access Is Forbidden') {
          DC.alertError('접근 권한이 없으니 로그인을 확인해 주세요.');
        }
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Modal open={open} handleClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>비밀번호 변경</Modal.Header>
        <Modal.Body>
          <PasswordChangeWrap>
            <FormInput
              id="password_before"
              type="password"
              name="password_before"
              label="비밀번호"
              placeholder="현재 비밀번호"
              rules={{
                required: '비밀번호는 필수 입력입니다.',
              }}
              errors={errors}
              register={register}
            />
            <FormInput
              id="password"
              type="password"
              name="password"
              label="새 비밀번호"
              placeholder="8자 이상 영어 + 숫자"
              rules={{
                required: '비밀번호는 필수 입력입니다.',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,100}$/,
                  message: '비밀번호는 8자 이상 영어 + 숫자로 입력해 주세요.',
                },
              }}
              errors={errors}
              register={register}
            />
            <FormInput
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              label="새 비밀번호 확인"
              placeholder="8자 이상 영어 + 숫자"
              register={register}
              errors={errors}
              rules={{
                required: '비밀번호는 필수 입력입니다.',
                validate: {
                  passWordCheck: value => {
                    if (getValues().password !== value) {
                      return '비밀번호가 일치하지 않습니다.';
                    }
                  },
                },
              }}
            />
          </PasswordChangeWrap>
        </Modal.Body>
        <Modal.Footer>
          <SubButton type="button" onClick={handleClose}>
            취소
          </SubButton>
          <MainButton type="submit">변경</MainButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

const PasswordChangeWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default PasswordChange;
