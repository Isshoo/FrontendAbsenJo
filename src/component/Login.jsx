import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";

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
      }}
    >
      <div className="flex justify-center align-center">
        <div className=" is-center">
          <div className=" is-4">
            <form
              onSubmit={Auth}
              className="box bg-opacity-80 bg-sky-300 shadow-lg rounded-lg p-6"
            >
              {isError && (
                <div className="flex justify-center">
                  <p className="bg-red-500 text-white px-2 py-1 text-sm absolute">
                    {message}
                  </p>
                </div>
              )}
              <div className=" mt-6">
                <label htmlFor="" className="label text-white">
                  Username
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="">
                <label htmlFor="" className="label text-white">
                  Password
                </label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className=" mt-6">
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {isLoading ? "Loading..." : "Masuk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
