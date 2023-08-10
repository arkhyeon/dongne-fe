import styled from '@emotion/styled';
import { FormInput } from '../../component/CommonComponents/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MainButton } from '../../component/CommonComponents/Button';
import { loginAxios } from '../../common/axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserType } from '../../type/UserType';

function MemberLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserType>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<UserType> = ({ userId, password }) => {
    if (!userId) {
      setError('userId', { message: '아이디를 입력해 주세요.' });
      return;
    }

    if (!password) {
      setError('password', { message: '비밀번호를 입력해 주세요.' });
      return;
    }

    loginAxios
      .post('user/login', { userId, password })
      .then(() => navigate('/'))
      .catch(err => {
        console.log(err);
        if (err.response.data.responseMessage === 'User Id Not Found') {
          setError('userId', { message: '존재하지 않는 아이디입니다.' });
        } else if (err.response.data.responseMessage === 'Incorrect Password') {
          setError('password', { message: '비밀번호가 틀렸습니다.' });
        } else {
          alert('로그인 오류로 인해 현재 접속할 수 없습니다.');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="logo-wrap">
        <img src="./src/asset/img/logo2.png" />
      </div>
      <JoinWrap>
        <p className="main-title-text" style={{ textAlign: 'center' }}>
          로그인
        </p>
        <FormInput<UserType>
          id="userId"
          name="userId"
          label="아이디"
          register={register}
          errors={errors}
        />
        <FormInput<UserType>
          id="password"
          type="password"
          name="password"
          label="비밀번호"
          errors={errors}
          register={register}
        />
        <MainButton type="submit">로그인</MainButton>
        <NavLink className="list-text flex-end" to={'/join'}>
          회원가입
        </NavLink>
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

export default MemberLogin;
