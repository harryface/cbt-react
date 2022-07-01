import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavBar from "../components/navbar";
import Body from "../components/body";
import AuthService from "../services/auth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    AuthService.login(e.target.email.value, e.target.password.value)
      .then(() => {
        setLoading(false);
        navigate("/exam");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          modifyErrorMessage(error.response.data.detail)
        } else {
          Swal.fire({
            icon: "error",
            title: "Something is wrong",
            text: "Please Try Back Later",
          });
        }
      });
  };

  const modifyErrorMessage = (message="") => {
    setErrorMessage(message)
  }

  return (
    <>
      <NavBar />
      <Body>
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-3-widescreen">

            {errorMessage && (
              <div className="notification is-danger">
                <button className="delete" onClick={ modifyErrorMessage }></button>
                { errorMessage }
              </div>
            )}

            <form onSubmit={ handleLogin } className="box">

              <div className="field">
                <label htmlFor="" className="label">
                  Email
                </label>
                <div className="control has-icons-left">
                  <input
                    type="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    className="input"
                    name="email"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label htmlFor="" className="label">
                  Password
                </label>
                <div className="control has-icons-left">
                  <input
                    type="password"
                    placeholder="*******"
                    className="input"
                    name="password"
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>

              <div className="field">
                <label htmlFor="" className="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>

              <div className="field">

                {loading ? (
                  <button
                    className="button is-success is-fullwidth"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Logging In...
                  </button>
                ) : (
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                )}

              </div>
            </form>
          </div>
        </div>
      </Body>
    </>
  );
}
