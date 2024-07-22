import AuthInputBox from '@/components/AuthInputBox/AuthInputBox';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { loginFormValues } from '@/components/AuthInputBox/AuthInputBox.types';
import { loginValidation } from '@/components/AuthInputBox/validation';
import Link from 'next/link';
import { PrimaryButton } from '@/components/Button/Button';
import useLogin from '@/hooks/useLogin';
import { useEffect, useMemo } from 'react';
import useLoginState from '@/hooks/useLoginState';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import useEnterSubmit from '@/hooks/useEnterSubmit';
import Spinner from '@/components/Spinner/Spinner';
import { InitialPageMeta } from '@/components/MetaData/MetaData';
import { SSRMetaProps } from '@/components/MetaData/MetaData.type';

export const getServerSideProps: GetServerSideProps = async () => {
  const OGTitle = '로그인 | GLOBALNOMAD';
  const OGUrl = 'https://globalnomad-5-8.netlify.app/login';
  return {
    props: {
      layoutType: 'removeLayout',
      OGTitle,
      OGUrl,
    },
  };
};

export default function LoginPage({ OGTitle, OGUrl }: SSRMetaProps) {
  const { postLoginMutation, isLoading } = useLogin();
  const { isLoggedIn } = useLoginState();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<loginFormValues>({ mode: 'onBlur' });

  const onSubmit = (data: loginFormValues) => {
    postLoginMutation.mutate(data);
  };

  const handleKeyDown = useEnterSubmit(handleSubmit(onSubmit));

  const { email, password } = watch();
  const isNotError = !errors.email && !errors.password;
  const isFormFilled = !!email && !!password;
  const IsAllFieldsValid = isFormFilled && isNotError;

  useEffect(() => {
    if (isLoggedIn) router.push('/');
  }, [isLoggedIn, router]);

  return (
    <>
      <InitialPageMeta title={OGTitle} url={OGUrl} />
      <div className="flex flex-col items-center max-w-[640px] m-auto pt-[160px] gap-[40px] px-[20px] ">
        {/* 로고 */}
        <Link href="/">
          <Image width={340} height={192} src="/icon/logo_big.svg" alt="로고" />
        </Link>

        {/* 로그인 폼 */}
        <form
          className="flex flex-col gap-[28px] w-full"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
        >
          <AuthInputBox
            label="이메일"
            placeholder="이메일을 입력해주세요"
            name="email"
            validation={loginValidation.email}
            register={register}
            errors={errors}
          />
          <AuthInputBox
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            name="password"
            type="password"
            validation={loginValidation.password}
            register={register}
            errors={errors}
            eyeIconActive={true}
          />
          <PrimaryButton
            size="large"
            style={IsAllFieldsValid ? 'enabled' : 'disabled'}
            onClick={handleSubmit(onSubmit)}
            disabled={!IsAllFieldsValid}
          >
            {isLoading ? '로그인중...' : '로그인하기'}
          </PrimaryButton>
        </form>

        {/* 회원가입페이지 리다이렉트 */}
        <div className="text-var-gray8 text-[16px] dark:text-var-gray2">
          회원이 아니신가요?
          <Link href="/signup" className="underline ml-[5px]">
            회원가입하기
          </Link>
        </div>
      </div>
    </>
  );
}
