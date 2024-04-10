import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import LogoAbsenJo from "../img/LogoAbsenJo.png";
import BgLogin from "../img/bgAbsen.jpeg";


const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(loginUser({ Username, Password }));
  };

  return (
    <section 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundImage: `url(${BgLogin})`,

      }}
    >
     
      <div className="flex justify-center items-center">
        <div className=" is-center">
          
          <div className=" is-4">
            <form
              onSubmit={Auth}
              className="box h-[600px] w-[350px] bg-opacity-80 bg-blue-300 shadow-lg rounded-lg p-10"
            >
              <div className="flex justify-center">
                <img className="h-[220px] w-[220px] flex justify-center drop-shadow-sm"
                src={LogoAbsenJo} alt="" />
              </div>

              <div className="flex justify-center mt-2">
                <p className="text-blue-900 font-bold text-center text-3xl py-2">ABSENJO</p>
              </div>
               {isError && (
               <div className="flex justify-center">
                  <p className=" text-red-500 px-2 text-sm">
                    {message}
                  </p>
                </div>
               )} 

              <div className=" mt-4 w-full flex justify-center">
                  <input
                    type="text"
                    className="input w-full p-2"
                    value={Username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
              </div>
              <div className="mt-4 w-full flex justify-center">
                  <input 
                    type="password"
                    className="input w-full p-2"
                    value={Password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <div className=" mt-4">
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-900 bg-opacity-80 text-white rounded-lg hover:bg-blue-600"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
              <div className="mt-2 flex">
                  <input className="h-[16px] w-[16px]"
                  type="checkbox" name="" id="" />
                  <p className="text-blue-800 text-xs ml-1 text-opacity-80">Ingat Saya?</p>
                </div>
                <div>
                  
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
