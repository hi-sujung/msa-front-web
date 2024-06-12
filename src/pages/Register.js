import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [department1, setDepartment1] = useState('');
  const [department2, setDepartment2] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const memberUrl = process.env.REACT_APP_MEMBER_API_URL;

  const handleRegister = async () => {
    handleChkPwd();
    try {
    //   const response = await axios.post(`${API_URL}/join`, {
        const response = await axios.post(`${memberUrl}/join`, {
        email,
        username,
        password,
        checkedPassword: confirmPassword,
        department1,
        department2,
        role: "USER"
      });

      if (response.status === 200) {
        setShowSuccessMessage(true);
        setShowErrorText(false);
        setErrorMessage('');
        console.log('Register Successful');

        navigate('/login');
      } else {
        setShowSuccessMessage(false);
        setShowErrorText(true);
        if (response.data.error) {
          setErrorMessage(response.data.error);
        } else {
          setErrorMessage('아이디 또는 비밀번호 형식이 올바르지 않습니다.');
        }
      }
    } catch (error) {
      console.error('Error Join in:', error);
      setErrorMessage('회원가입에 실패하였습니다.' + error.message);
      setShowSuccessMessage(false);
      setShowErrorText(true);
    }
  };

  const handleChkPwd = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);
  };

  return (
    <div>
      <h1>회원가입</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <select value={department1} onChange={(e) => setDepartment1(e.target.value)}>
        <option value="">-- 주전공 --</option>
        <option value="국어국문학과">국어국문학과</option>
        <option value="영어영문학과">영어영문학과</option>
      </select>
      <select value={department2} onChange={(e) => setDepartment2(e.target.value)}>
        <option value="">-- 복수전공 --</option>
        <option value="국어국문학과">국어국문학과</option>
        <option value="영어영문학과">영어영문학과</option>
      </select>
      {passwordMatchError && <p>Passwords do not match</p>}
      {showErrorText && <p>{errorMessage}</p>}
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
