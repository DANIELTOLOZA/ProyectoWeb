import React from "react";
import LayoutInicio from "./Layout/LayoutInicio";
import LoginForm from "./Form/LoginForm";
const Login = () => {
  return (
    <LayoutInicio Form={<LoginForm />}/>
 
  );
};

export default Login;



