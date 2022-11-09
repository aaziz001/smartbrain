import React, { useState } from "react";
import "./Profile.css";

const Profile = ({ isProfileOpen, toggleModal, user, loaduser }) => {
  const [formInput, setFormInput] = useState({
    name: user.name,
    age: user.age,
    pet: user.pet,
  });

  const handleProfileUpdate = (data) => {
    fetch(`http://localhost:3001/profile/${user.id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        toggleModal();
        loaduser(...user, ...data);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="profile-modal">
      <article class="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="br-100 h3 w3 dib"
            alt="avatar"
          />
          <h1>{formInput.name}</h1>
          <h4>{`Images Submitted: ${user.entries}`}</h4>
          <p>{`Member Since: ${new Date(user.joined).toLocaleDateString()}`}</p>
          <hr />
          <label className="mt2 fw6" for="user-name">
            Name:
          </label>
          <input
            className="pa2 ba w-100"
            type="text"
            placeholder={user.name}
            name="user-name"
            id="name"
            onChange={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
          <label className="mt2 fw6" for="user-age">
            Age:
          </label>
          <input
            className="pa2 ba w-100"
            type="text"
            placeholder={user.age}
            name="user-age"
            id="age"
            onChange={(e) =>
              setFormInput({ ...formInput, age: e.target.value })
            }
          />
          <label className="mt2 fw6" for="user-pet">
            Pet:
          </label>
          <input
            className="pa2 ba w-100"
            type="text"
            placeholder={user.pet}
            name="user-pet"
            id="pet"
            onChange={(e) =>
              setFormInput({ ...formInput, pet: e.target.value })
            }
          />
          <div className="button-container mt-4">
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              onClick={() => handleProfileUpdate(formInput)}
            >
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </main>
        <div className="close-icon" onClick={toggleModal}>
          &times;
        </div>
      </article>
    </div>
  );
};

export default Profile;
