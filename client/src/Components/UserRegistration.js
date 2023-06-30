import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

function UserRegistration() {
  const navigate = useNavigate();
  const [regno, setRegNo] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("male");

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/register`, { regno, username, dob, gender })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <div className="view" onClick={() => navigate("/")}>
        View Users
      </div>
      <form>
        <div className="heading">Enter User Details</div>
        <div className="input-fields">
          <div className="item">
            <label htmlFor="regno">Registration Number</label>
            <input type="text" name="regno" className="regno input" id="regno" onChange={(e) => setRegNo(e.target.value)} />
          </div>
          <div className="item">
            <label htmlFor="username">User Name</label>
            <input type="text" name="username" className="username input" id="username" onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="item">
            <label htmlFor="dateofbirth">Date of birth</label>
            <input type="date" name="dateofbirth" className="dateofbirth input" id="dateofbirth" onChange={(e) => setDOB(e.target.value)} />
          </div>
          <div className="item gender">
            <label htmlFor="gender">Gender</label>
            <select name="gender" defaultValue={"male"} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div className="btn-container">
          <input type="submit" className="btn submit" value="Submit" onClick={(e) => onSubmit(e)} />

          <input type="reset" className="btn clear" value="Clear" />
        </div>
      </form>
    </Container>
  );
}

export default UserRegistration;

const Container = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .view {
    position: absolute;
    left: 30px;
    top: 30px;
    background-color: var(--clr1);
    padding: 15px 30px;
    border-radius: 12px;
    box-shadow: 0 0 3px 0 var(--clr-dark);
    cursor: pointer;
    color: var(--clr-dark);

    &:hover {
      background-color: var(--clr2);
    }
  }

  form {
    width: 600px;
    height: max-content;
    padding: 20px 30px;
    background-color: var(--clr1);
    box-shadow: 0 0 3px 0 var(--clr3);
    border-radius: 12px;

    .heading {
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--clr-dark);
      text-align: center;
      margin-bottom: 30px;
    }

    label {
      color: var(--clr-dark);
      font-weight: 400;
    }

    .input-fields {
      display: flex;
      flex-direction: column;
      row-gap: 15px;

      .item {
        display: grid;
        grid-template-columns: 1fr 2fr;

        label {
          align-self: center;
        }

        input {
          padding: 10px;
          outline: none;
          border: none;
        }

        &.gender {
          height: 40px;

          select {
            padding-left: 12px;
            background-color: white;
            border: none;
          }
        }
      }
    }

    .btn-container {
      display: flex;
      align-items: center;
      column-gap: 20px;
      margin-top: 30px;

      input {
        flex: 1;
        height: 50px;
        border: none;
        background-color: var(--clr3);
        color: white;
        font-weight: 500;
        font-size: 0.8rem;
        cursor: pointer;
        border-radius: 8px;

        &:hover {
          background-color: var(--clr-dark);
        }

        &.clear {
          background-color: var(--btn-red);

          &:hover {
            background-color: var(--btn-red-alt);
          }
        }
      }
    }
  }
`;
