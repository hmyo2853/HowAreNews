import { Button } from "@mui/material";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

// 로그인 이증 후 화면
const Home = () => {
  // user data
  const [_object, _setObjcet] = useState<User | null>(null);
  // set name, email
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  // loading
  const [loading, setLoading] = useState<boolean>(true);

  const onLogOut = () => {
    auth.signOut();
  };

  // 로그인 중일떄 정보 출력
  const getAuthState = async () => {
    let __object: User | null = null;
    let _worker_id: NodeJS.Timer | null = null;

    auth.onAuthStateChanged((user) => {
      __object = user;
    });

    _worker_id = setInterval(() => {
      if (__object?.displayName) {
        _worker_id && clearInterval(_worker_id);
        _setObjcet(__object);
        setLoading(false);
      }
    }, 50);
  };

  useEffect(() => {
    getAuthState();
    setName(_object?.displayName || null);
    setEmail(_object?.email || null);
  }, [_object]);

  if (loading) return <strong>Loading...</strong>;

  return (
    <>
      {name && (
        <>
          <h2>{name} 님, 반갑습니다.</h2>
          <h3>로그인 계정 : {email}</h3>
        </>
      )}
      <Button variant="outlined" onClick={onLogOut}>
        Log Out
      </Button>
    </>
  );
};
export default Home;
