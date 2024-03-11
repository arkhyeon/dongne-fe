import { FormInput } from '../../../component/CommonComponents/TextInput';
import { MainButton } from '../../../component/CommonComponents/Button';
import DataList from '../../../component/CommonComponents/DataList';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { CityCodeNames, DistrictType, UserMainInfo } from '../../../type/UserType';
import { client } from '../../../common/axios';
import { getCookie } from '../../../common/Cookie';
import PasswordChange from '../modal/PasswordChange.tsx';

function MemberEdit() {
  const [pwdChangeOpen, setPwdChangeOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log({ ...data, cityCode: city, zoneCode: zone });

    const formData = new FormData();
    const blob = new Blob(
      [
        JSON.stringify({
          nickname: data.nickname,
          cityCode: city,
          zoneCode: zone,
          isProfileChanged: !!data.profile.length,
        }),
      ],
      { type: 'application/json' },
    );

    formData.append('basicRequestDto', blob);
    formData.append('file', data.profile[0]);

    client
      .patch(`user-basic/${getCookie('userId')}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(res => {
        console.log(res);
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

  const [districtList, setDistrictList] = useState<DistrictType>({
    cityCodeNames: [],
    zoneCodeNames: [],
  });
  const [city, setCity] = useState<string>('');
  const [zone, setZone] = useState<string>('');

  useEffect(() => {
    settingUserInfo();
  }, []);

  const getZoneList = (cityCode: string, zoneName?: string) => {
    client.get<DistrictType>(`zone/${cityCode || city}`).then(({ zoneCodeNames }) => {
      const zoneCode = zoneCodeNames.find(zn => zn.name === zoneName)?.zoneCode ?? '26';
      setZone(zoneCode);
      setDistrictList(prevState => {
        return {
          ...prevState,
          zoneCodeNames: zoneCodeNames,
        };
      });
    });
  };

  const getUserInfo = (cityCodeNames: CityCodeNames[]) => {
    client.get<UserMainInfo>(`user-main?page=0&size=1`).then(res => {
      setValue('nickname', res.nickname);
      const cityCode = cityCodeNames.find(cn => cn.name === res.cityName)?.cityCode ?? '26';
      setCity(cityCode);
      getZoneList(cityCode, res.zoneName);
    });
  };

  const settingUserInfo = () => {
    client.get<DistrictType>('city').then(res => {
      getUserInfo(res.cityCodeNames);
      setCity(res.cityCodeNames[0].cityCode);
      setDistrictList(prevState => {
        return {
          ...prevState,
          cityCodeNames: res.cityCodeNames,
        };
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <JoinWrap>
        <FormInput id="userId" name="userId" label="아이디" value={getCookie('userId')} readOnly />
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
        <FormInput
          id="profile"
          label="프로필 사진"
          name="profile"
          register={register}
          type="file"
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
        <ButtonWrap>
          <MainButton onClick={() => setPwdChangeOpen(true)}>비밀번호 변경</MainButton>
          <MainButton type="submit">수정</MainButton>
        </ButtonWrap>
      </JoinWrap>
      <PasswordChange open={pwdChangeOpen} handleClose={() => setPwdChangeOpen(false)} />
    </form>
  );
}
const JoinWrap = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 22px;

  & button {
    min-width: 80px;
    height: 34px;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

export default MemberEdit;
