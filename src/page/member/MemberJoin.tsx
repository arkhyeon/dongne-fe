import styled from '@emotion/styled';
import { FormInput } from '../../component/CommonComponents/TextInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import DataList from '../../component/CommonComponents/DataList';
import { useEffect, useState } from 'react';
import { MainButton } from '../../component/CommonComponents/Button';
import { client } from '../../common/axios';
import { DistrictType } from '../../type/UserType';
import { useNavigate } from 'react-router-dom';

function MemberJoin() {
  const navigate = useNavigate();
  const [districtList, setDistrictList] = useState<DistrictType>({
    cityCodeNames: [],
    zoneCodeNames: [],
  });
  const [city, setCity] = useState<string>('');
  const [zone, setZone] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    getZoneList('11');
    client.get<DistrictType>('city').then(res => {
      setCity(res.cityCodeNames[0].cityCode);
      setDistrictList(prevState => {
        return {
          ...prevState,
          cityCodeNames: res.cityCodeNames,
        };
      });
    });
  }, []);

  const getZoneList = async (cityCode: string) => {
    client.get<DistrictType>(`zone/${cityCode || city}`).then(({ zoneCodeNames }) => {
      setZone(zoneCodeNames[0].zoneCode);
      setDistrictList(prevState => {
        return {
          ...prevState,
          zoneCodeNames: zoneCodeNames,
        };
      });
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = data => {
    client
      .post('user/sign-up', { ...data, cityCode: city, zoneCode: zone })
      .then(res => {
        console.log(res);
        navigate('/login');
      })
      .catch(err => {
        if (err.response.data.responseMessage === 'User Id Already Exist') {
          setError('userId', { message: '이미 사용하고 있는 아이디입니다.' });
        } else if (err.response.data.responseMessage === 'Nickname Already Exist') {
          setError('nickname', { message: '이미 사용하고 있는 닉네입입니다.' });
        }
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="logo-wrap">
        <img src="./src/asset/img/logo2.png" />
      </div>
      <JoinWrap>
        <p className="main-title-text" style={{ textAlign: 'center' }}>
          회원가입
          <span className="list-text">
            <br />
            동네 이웃들과 이야기하러 오세요.
          </span>
        </p>
        <FormInput
          id="userId"
          name="userId"
          label="아이디"
          placeholder="2 ~ 12자 영문 + 숫자"
          register={register}
          errors={errors}
          rules={{
            required: '아이디는 필수 입력입니다.',
            pattern: {
              value: /^[a-z0-9]{2,12}$/g,
              message: '아이디는 2 ~ 12자 영문과 숫자를 사용해 주세요.',
            },
          }}
        />
        <FormInput
          id="password"
          type="password"
          name="password"
          label="비밀번호"
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
          label="비밀번호 확인"
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
        <FormInput
          id="username"
          name="username"
          label="이름"
          register={register}
          errors={errors}
          rules={{
            pattern: {
              value: /^[a-zA-Zㄱ-힣0-9]{0,5}$/,
              message: '이름은 5자 이하로 작성해 주세요.',
            },
          }}
        />
        <FormInput
          id="nickname"
          name="nickname"
          label="닉네임"
          placeholder="2 ~ 12자 영문 + 숫자"
          register={register}
          errors={errors}
          rules={{
            required: '닉네임은 필수 입력입니다.',
            pattern: {
              value: /^[a-zA-Zㄱ-힣0-9]{2,12}$/,
              message: '닉네임은 2 ~ 12자 한글과 영문과 숫자를 사용해 주세요.',
            },
          }}
        />
        <div>
          <label className="list-text">주소</label>
          <DataList
            height={'300px'}
            valueList={districtList.cityCodeNames.map(cl => cl.cityCode)}
            labelList={districtList.cityCodeNames.map(cl => cl.name)}
            setData={value => {
              getZoneList(value);
              setCity(value);
              setZone(districtList.zoneCodeNames[0].zoneCode);
            }}
            defaultValue={city}
            select
          />
          <DataList
            height={'300px'}
            valueList={districtList.zoneCodeNames.map(zl => zl.zoneCode)}
            labelList={districtList.zoneCodeNames.map(zl => zl.name)}
            setData={value => setZone(value)}
            defaultValue={zone}
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
  min-height: calc(100vh - 358px);
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 25px;

  & button {
    width: 100%;
    height: 34px;
  }
`;

export default MemberJoin;
