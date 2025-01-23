import React from "react";

export default function AddSearchField(x, handleInputChange, i) {
  return (
    <input
      className="ml10 my-2"
      name="name"
      placeholder="Enter Audio Name"
      value={x.name}
      onChange={(e) => handleInputChange(e, i)}
    />
  );
}
