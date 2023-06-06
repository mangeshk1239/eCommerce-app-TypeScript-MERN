import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from "./containers/register/RegisterPage";
import LoginPage from "./containers/login/LoginPage";

function App(): JSX.Element {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} ></Route>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;