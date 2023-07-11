import styled from '@emotion/styled';
import { FormInput } from '../../component/CommonComponents/TextInput';
import { useForm } from 'react-hook-form';
import DataList from '../../component/CommonComponents/DataList';
import { useState } from 'react';
import { MainButton } from '../../component/CommonComponents/Button';
import AnimationCheck from '../../component/CommonComponents/AnimationCheck';
import { district } from '../../../data';

function MemberJoin(props) {
  const [state, setState] = useState('서울특별시');
  const [address, setAddress] = useState(district[state][0]);
  const [districtList, setDistrictList] = useState(district[state]);
  const [dupCheck, setDupCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: 'onChange' });

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <JoinWrap>
        <p className="main-title-text" style={{ textAlign: 'center' }}>
          <img src="" />
          회원가입 <span className="list-text">동네 이웃들과 이야기하러오세요.</span>
        </p>

        <InputWrap>
          <FormInput
            id="userid"
            label={
              <>
                아이디{' '}
                {errors.userid && (
                  <p className="error-text" role="alert">
                    {errors.userid.message}
                  </p>
                )}
              </>
            }
            placeholder="2 ~ 8자 영문 + 숫자"
            reg={{
              ...register('userid', {
                onChange: () => setDupCheck(false),
                required: '아이디는 필수 입력입니다.',
                pattern: {
                  value: /^[a-z0-9]{2,8}$/g,
                  message: '아이디는 2 ~ 8자 영문과 숫자를 사용해 주세요.',
                },
              }),
            }}
          />
          <MainButton onClick={() => setDupCheck(true)}>
            {dupCheck ? <AnimationCheck /> : '중복확인'}
          </MainButton>
        </InputWrap>

        <FormInput
          id="password"
          type="password"
          label={
            <>
              비밀번호{' '}
              {errors.password && (
                <p className="error-text" role="alert">
                  {errors.password.message}
                </p>
              )}
            </>
          }
          placeholder="8 ~ 16자 이상 영어 + 숫자"
          reg={{
            ...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              pattern: {
                value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
                message: '비밀번호는 8 ~ 16자 이상 영어 + 숫자로 입력해 주세요.',
              },
            }),
          }}
        />

        <FormInput
          id="password-check"
          type="password"
          label={
            <>
              비밀번호 확인{' '}
              {errors.passwordConfirm && (
                <p className="error-text" role="alert">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </>
          }
          placeholder="8 ~ 16자 이상 영어 + 숫자"
          reg={{
            ...register('passwordConfirm', {
              required: '비밀번호는 필수 입력입니다.',
              validate: {
                passWordCheck: value => {
                  if (getValues('password') !== value) {
                    return '비밀번호가 일치하지 않습니다.';
                  }
                },
              },
            }),
          }}
        />
        <FormInput
          id="nickname"
          label={
            <>
              닉네임{' '}
              {errors.nickname && (
                <p className="error-text" role="alert">
                  {errors.nickname.message}
                </p>
              )}
            </>
          }
          placeholder="2 ~ 8자 영문 + 숫자"
          reg={{
            ...register('nickname', {
              required: '닉네임은 필수 입력입니다.',
              pattern: {
                value: /^[a-zA-Zㄱ-힣0-9]{2,8}$/,
                message: '닉네임은 2 ~ 8자 한글과 영문과 숫자를 사용해 주세요.',
              },
            }),
          }}
        />
        <div>
          <label className="list-text">주소</label>
          <DataList
            valueList={Object.keys(district)}
            setData={value => {
              setState(value);
              setAddress(district[value][0]);
              setDistrictList(district[value]);
            }}
            defaultValue={state}
            select
          />
          <DataList
            valueList={districtList}
            setData={value => setAddress(value)}
            defaultValue={address}
            select
          />
        </div>
        <MainButton type="submit">회원 가입</MainButton>
      </JoinWrap>
    </form>
  );
}

const JoinWrap = styled.div`
  width: 500px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;

  & button {
    width: 100%;
    height: 34px;
  }
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 15px;

  & button {
    width: 100px;
  }
`;

export default MemberJoin;
