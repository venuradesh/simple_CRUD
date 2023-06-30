import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

function ViewUsers() {
  const navigate = useNavigate();
  const [isloaded, setIsLoaded] = useState(false);
  const [noData, setNoData] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    setNoData(false);
    axios
      .get(`${API_URL}/getUsers`)
      .then((res) => {
        console.log(res);
        setUsers([...res.data.message]);
        setIsLoaded(true);
        if (res.data.message.length === 0) {
          setNoData(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <div className="container">
        <div className="heading">Registered Users</div>
        <div className="columnHeaders">
          <div className="regNo item">Register Number</div>
          <div className="name item">Name</div>
          <div className="gender item">Gender</div>
          <div className="item options">Edit Section</div>
          <div className="item options">Delete Section</div>
        </div>
        {isloaded && !noData ? (
          <>
            {users.map((user) => (
              <div className="user-details">
                <div className="item">{user.regno}</div>
                <div className="item">{user.username}</div>
                <div className="item">{user.gender === "M" ? "Male" : "Female"}</div>
                <div className="item edit options">
                  <div className="item-option edit" onClick={() => navigate(`/edit/${user.regno.replaceAll("/", "-")}`)}>
                    Edit
                  </div>
                </div>
                <div className="item delete options">
                  <div className="item-option delete">Delete</div>
                </div>
              </div>
            ))}
          </>
        ) : !isloaded ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="no-data">No Users Registered</div>
        )}
        <div className="add-user" onClick={() => navigate("/register")}>
          +
        </div>
      </div>
    </Container>
  );
}

export default ViewUsers;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 80px);
  z-index: 0;

  .container {
    width: 80%;
    height: 90%;
    padding: 30px;
    box-shadow: 0 0 3px 0 var(--clr3);
    background-color: var(--bg-clr);
    position: relative;

    .heading {
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: 600;
      color: var(--clr3);
      text-align: center;
      margin-bottom: 30px;
    }

    .columnHeaders {
      display: flex;
      width: 100%;
      margin-bottom: 10px;
      font-weight: 500;
      color: var(--clr3);

      .item {
        flex: 1;
        display: flex;
        justify-content: center;
        border-left: 1px solid var(--clr3);

        &.options {
          flex: 0.5;
        }

        &:last-of-type {
          border-right: 1px solid var(--clr3);
        }
      }
    }

    .user-details {
      display: flex;

      .item {
        display: flex;
        justify-content: center;
        padding-left: 10px;
        flex: 1;
        border-bottom: 1px solid var(--clr2);
        color: var(--clr3);
        opacity: 0.8;
        font-size: 0.8rem;
        /* padding-bottom: 10px; */
        /* margin-bottom: 20px; */
        height: 50px;
        display: flex;
        align-items: center;

        &.options {
          flex: 0.5;

          .item-option {
            width: max-content;
            height: 25px;
            padding-inline: 30px;
            display: flex;
            align-items: center;
            border-radius: 12px;
            font-size: 0.7rem;
            box-shadow: 0 0 3px var(--clr3);
            cursor: pointer;

            &.edit {
              background-color: var(--btn-green);
              color: black;

              &:hover {
                background-color: var(--btn-green-alt);
              }
            }

            &.delete {
              background-color: var(--btn-red);
              color: white;

              &:hover {
                background-color: var(--btn-red-alt);
              }
            }
          }
        }
      }
    }

    .add-user {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      background-color: var(--btn-green);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      box-shadow: 0 0 3px var(--clr3);
      font-size: 1.5rem;
      font-weight: 500;
      cursor: pointer;
    }

    .no-data,
    .loading {
      text-align: center;
      margin-top: 30px;
      color: var(--clr2);
    }
  }
`;
