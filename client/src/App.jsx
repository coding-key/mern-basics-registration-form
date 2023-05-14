import { useEffect, useState } from "react";

const initialUserDataState = {
  email: "",
  password: "",
  confirmPassword: "",
  termsAgree: false,
};

function App() {
  const [userData, updateUser] = useState(initialUserDataState);

  const [isShowSuccess, updateSuccessMsg] = useState(false);
  const [statusMsg, updateStatusMsg] = useState("");

  const [presentUser, updatePresent] = useState([]);

  useEffect(() => {
    getDatabaseData();
  }, []);

  const getDatabaseData = async () => {
    const response = await fetch("http://localhost:3000/", {
      method: "GET",
    });
    if (response.status === 200) {
      const data = await response.json();
      updatePresent(data);
    }
  };

  const formDataChange = (event) => {
    updateSuccessMsg(false);
    const changeName = event.target.name;
    switch (changeName) {
      case "userEmail":
        return updateUser({ ...userData, email: event.target.value });
      case "userPassword":
        return updateUser({ ...userData, password: event.target.value });
      case "userConfirm":
        return updateUser({ ...userData, confirmPassword: event.target.value });
      case "terms":
        return updateUser({ ...userData, termsAgree: !userData.termsAgree });
    }
  };

  const formSubmitted = async (event) => {
    event.preventDefault();
    if (
      userData.email !== "" &&
      userData.password !== "" &&
      userData.confirmPassword !== "" &&
      userData.termsAgree === true
    ) {
      if (userData.confirmPassword === userData.password) {
        const userInfo = {
          email: userData.email,
          password: userData.password,
        };

        const response = await fetch("http://localhost:3000/", {
          method: "POST",
          body: JSON.stringify(userInfo),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.status === 200) {
          getDatabaseData()
          updateSuccessMsg(true);
          updateStatusMsg(data);
          updateUser(initialUserDataState);
        }
      } else {
        alert("Password Not Match");
      }
    } else {
      alert("Fill all the Details and Agree T&C");
    }
  };

  return (
    <>
      <form
        onSubmit={formSubmitted}
        className="m-5 p-5 border shadow rounded-4"
      >
        <h1 className="mb-4 text-center">Registration Form</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={formDataChange}
            name="userEmail"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={userData.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={formDataChange}
            name="userPassword"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={userData.password}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            value={userData.confirmPassword}
            onChange={formDataChange}
            name="userConfirm"
            type="password"
            className="form-control"
            id="confirmPassword"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            name="terms"
            onChange={formDataChange}
            checked={userData.termsAgree}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            By clicking here, I state that I have read and understood the terms
            and conditions.
          </label>
        </div>
        <button
          onClick={formSubmitted}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
        {isShowSuccess ? <p className="mt-3 text-success">{statusMsg}</p> : ""}
      </form>
      <div className="m-5 p-5">
        <h1 className="text-center">Registred User</h1>
        <ul>{presentUser.map((each) => (<li key={each._id}>{each.email}</li>))}</ul>
      </div>
    </>
  );
}

export default App;
