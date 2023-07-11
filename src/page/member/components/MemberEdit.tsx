import { district } from '../../../../data';
import { FormInput } from '../../../component/CommonComponents/TextInput';
import { MainButton } from '../../../component/CommonComponents/Button';
import DataList from '../../../component/CommonComponents/DataList';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import AnimationCheck from '../../../component/CommonComponents/AnimationCheck';

function MemberEdit(props) {
  const [state, setState] = useState('서울특별시');
  const [address, setAddress] = useState(district[state][0]);
  const [districtList, setDistrictList] = useState(district[state]);
  const [dupCheck, setDupCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <JoinWrap>
        <FormInput id="userid" label="아이디" value="r2ware" readOnly />
        <p className="list-text">* 비밀번호 변경은 불가합니다.</p>
        <InputWrap>
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
          <MainButton onClick={() => setDupCheck(true)}>
            {dupCheck ? <AnimationCheck /> : '중복확인'}
          </MainButton>
        </InputWrap>
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
        <ButtonWrap>
          <MainButton type="submit">수정</MainButton>
        </ButtonWrap>
      </JoinWrap>
    </form>
  );
}
const JoinWrap = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 22px;

  & button {
    width: 80px;
    min-width: 80px;
    height: 34px;
  }
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 15px;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default MemberEdit;
