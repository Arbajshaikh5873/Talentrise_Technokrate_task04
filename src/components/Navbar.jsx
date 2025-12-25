import React from "react";

function Navbar({ showForm, setShowForm }) {
  return (
    <div>
      <nav>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
        >
          Add new todo
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
