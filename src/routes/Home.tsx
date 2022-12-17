import { Button } from "@mui/material";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useQuery } from "react-query";
import React from "react";

// 로그인 이증 후 화면
const Home = () => {
	// User 객체
	const [_object, _setObject] = useState<User | null>(null);

	// 이름, 이메일
	const [name, setName] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);

	const navigate = useNavigate();
	const onLogOut = () => {
		auth.signOut();
		navigate("/");
	};

	/** 로그인 상태 확인 함수 */
	const isLoggedin = () => !!_object;

	// 로그인 중일 때 정보 출력
	const getAuthState = () => {
		let __object: User | null = null;
		let _worker_id: NodeJS.Timer | null = null;

		auth.onAuthStateChanged((user) => {
			__object = user;
		});

		_worker_id = setInterval(() => {
			if (__object?.displayName) {
				_worker_id && clearInterval(_worker_id);
				_setObject(__object);
			}
		}, 100);
	};

	useEffect(() => {
		// 로그인 요청 -> object.displayName이 있을 때까지 계속 확인 -> name, email 저장
		getAuthState();
	}, []);

	useEffect(() => {
		console.log(_object);
		setName(_object?.displayName || null);
		setEmail(_object?.email || null);
	}, [_object]);

	return (
		<>
			{isLoggedin() && (
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
