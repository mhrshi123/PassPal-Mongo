import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setPasswordArray] = useState([]);

  function copyText(text) {
    navigator.clipboard.writeText(text);
    toast('🦄text copid to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: "Bounce",
      });
  }

  useEffect(() => {

    let passwords = localStorage.getItem("passwords");
    // let passwordArray;
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {

    if (ref.current.src.includes("Icons/eye-cross.png")) {
      ref.current.src = "Icons/eye.png";
      passwordRef.current.type = "text";

    } else {
      ref.current.src = "Icons/eye-cross.png";
      ref.current.src = "Icons/eye-cross.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {

    setPasswordArray([...passwordArray, form]);

    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log(...passwordArray, form);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      ></ToastContainer>
      
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className="myContainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700 font-bold">&lt;</span>
          <span className="text-white">Pass</span>

          <span className="text-green-700">Pal</span>
          <span className="text-green-700 font-bold">/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          your own password manager
        </p>
        <div className="text-white flex flex-col p-4 gap-3 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter website url"
            className="rounded-full border border-green-500 w-full text-black p-4 py-1"
            type="text"
          />
          <div className="flex w-full gap-8 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full text-black p-4 py-1"
              type="text"
              name="username"
              id=""
            />

            <div className="relative">
              <input
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                ref={passwordRef}
                type="password"
                className="rounded-full border border-green-500  text-black p-4 py-1"
                name="password"
                id=""
              />
              <span className="absolute right-0 text-black px-4 text-center bottom-0 top-0" onClick={() => { showPassword() }}>
                <img

                  src="Icons/eye.png"
                  className="cursor-pointer"
                  ref={ref}
                  alt="eye"
                  style={{ width: "32px", height: "32px" }}
                />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className="flex justify-center gap-2 items-center text-black bg-green-600 hover:bg-green-500 px-6 py-2 w-fit text-center mx-auto rounded-full ">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 text-white text-center">Your Passwords</h2>
          {passwordArray.length == 0 && <div className="text-white text-center">No Passwords to show</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full overflow-hidden rounded-md ">
              <thead className="text-white  bg-green-800">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">

                {
                  passwordArray.map((item, index) => {
                    return <tr key={index}>
                      <td className=" text-center py-2 border " >
                        <div className="flex items-center justify-center">
                          <span>{item.site}</span>
                          <div className='coopyBtn size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td >
                      <td className="  text-center py-2 border">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>

                          <div className='copyBtn size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td >
                      <td className="   text-center py-2 border ">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>

                          <div className='copyBtn size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                          </div>
                        </div>
                      </td >
                    </tr>
                  })}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  );
};

export default Manager;
