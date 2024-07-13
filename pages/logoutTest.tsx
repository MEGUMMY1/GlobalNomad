import useLoginState from '@/hooks/useLoginState';
import useLogout from '@/hooks/useLogout';

export default function logoutTest() {
  const logout = useLogout();
  const { isLoggedIn } = useLoginState();

  console.log(isLoggedIn);

  return (
    <div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
