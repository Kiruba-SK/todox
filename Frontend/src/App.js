import { Routes, Route, Navigate } from "react-router-dom";
// components
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
// recoil
import { useRecoilState } from "recoil";
import userInfoAtom from "./recoil/userInfoAtom";
// import { useEffect } from "react";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  // useEffect(() => {
  //   if (localStorage?.getItem("userStatus")?.includes("true")) {
  //     setUserInfo(true);
  //   } else {
  //     setUserInfo(false);
  //   }
  // }, [localStorage?.getItem("userStatus")]);


  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={userInfo === false ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={userInfo === true ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/newuser"
          element={<NewUser />}
        />
      </Routes>
    </div>
  );
}

export default App;
