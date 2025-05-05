import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../firebase";

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setloginError] = useState("");

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();


  //HandleSignup
  const HandleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("signup done");
      setloginError("");
    } catch (error) {
      console.log(error);
      setloginError(error.message);
    }
  };

     //handlegoogleLogin
  const HandleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log("Google login done");
      setloginError("");
    } catch (error) {
      console.log(error);
      setloginError(error.message);
    }
  };


   //handle Login
  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("logged in");
      setloginError("");
    } catch (error) {
      console.log(error.code);
      setloginError(error.message);
    }
  };


  //HandleFoget Password
  const HandleFogetPassword = async (e) => {
    e.preventDefault();

    if (!email ) {
      setloginError("Please enter your email first.");
      return;
      
    }

    try {

      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
      setloginError("");


    } catch (error) {
      console.log(error.message);
      
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[90vw] max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome</h2>

        <form onSubmit={HandleLogin} className="flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Email"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            placeholder="Password"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={HandleSignup}
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
          >
            Sign Up
          </button>

          <button
            onClick={HandleGoogleLogin}
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-md transition"
          >
            Continue with Google
          </button>
          <button
          type="button"
          onClick={HandleFogetPassword}
          className="text-blue-600 text-sm hover:underline text-left"
        >
          Forgot Password?
        </button>

        </div>
      </div>
    </div>
  );
};

export default Register;
