import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from "../../firebase";

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginError, setloginError] = useState("");

  const auth = getAuth(app);

  const HandleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('signup done');
    } catch (error) {
      console.log(error);
      setloginError(error.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center  ">
      <form className="flex flex-col gap-5">
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          name="email" 
          value={email}  
          className="w-[35vw] max-lg:w-[80vw] max-sm:w-[90vw] bg-[#1E1E1E] p-3 border-none text-white rounded-[5px] hover:border-b"
          type="email" 
          required 
          placeholder="Email" 
          id="email" 
        />

        <input 
          onChange={(e) => setPassword(e.target.value)} 
          name="password" 
          value={password}  
          className="w-[35vw] max-lg:w-[80vw] max-sm:w-[90vw] bg-[#1E1E1E] p-3 border-none text-white rounded-[5px] hover:border-b"
          type="password" 
          required 
          placeholder="Password" 
          id="password" 
        />

        <button className="w-[10vw] p-3 bg-neutral-900 text-white " type="submit" onClick={HandleSignup}>Sign up</button>
        <button className="w-[10vw] p-3 bg-neutral-900 text-white "  type="button">Google</button>

        {loginError && <p className="text-red-500">{loginError}</p>}
      </form>
    </div>
  );
}

export default Register;
