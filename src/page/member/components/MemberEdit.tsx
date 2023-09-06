import { FormInput } from '../../../component/CommonComponents/TextInput';
import { MainButton } from '../../../component/CommonComponents/Button';
import DataList from '../../../component/CommonComponents/DataList';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { DistrictType } from '../../../type/UserType';
import { client } from '../../../common/axios';

function MemberEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    client
      .post('user/sign-in', { ...data, cityCode: city, zoneCode: zone })
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
    getZoneList('26');
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <JoinWrap>
        <FormInput id="userId" name="userId" label="아이디" value="r2ware" readOnly />
        <p className="list-text">* 비밀번호 변경은 불가합니다.</p>
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
            id={'cityList'}
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
            id={'zoneList'}
            height={'300px'}
            valueList={districtList.zoneCodeNames.map(zl => zl.zoneCode)}
            labelList={districtList.zoneCodeNames.map(zl => zl.name)}
            setData={value => setZone(value)}
            defaultValue={zone}
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

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default MemberEdit;
