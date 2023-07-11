import styled from '@emotion/styled';
import { FormInput } from '../../component/CommonComponents/TextInput';
import { useForm } from 'react-hook-form';
import { MainButton } from '../../component/CommonComponents/Button';
import AlertBox from '../../component/AlertBox';

function MemberLogin(props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = data => {
    setError('userid', { message: 'hala' });
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <JoinWrap>
        <p className="main-title-text" style={{ textAlign: 'center' }}>
          <img src="" />
          로그인
        </p>
        <FormInput
          id="userid"
          label="아이디"
          reg={{
            ...register('userid'),
          }}
        />
        <FormInput
          id="password"
          type="password"
          label="비밀번호"
          reg={{
            ...register('password'),
          }}
        />
        {errors.userid && (
          <AlertBox>
            <div>
              <p className="error-title-text">로그인 실패</p>
              <p className="error-text">아이디 또는 비밀번호가 틀렸습니다.</p>
            </div>
          </AlertBox>
        )}
        <MainButton type="submit">로그인</MainButton>
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
