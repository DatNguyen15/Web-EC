import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (c) => () => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    //if currently checked was not already in checked state > push
    //else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };
  return categories.map((c, i) => (
    <div key={i} className="list-unstyled" style={{ marginBottom: "10px" }}>
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id === -1)}
        type="checkbox"
        id={i}
        className="form-check-input mr-2 ml-4"
      />
      <label className="form-check-label mr-3 ml-5" htmlFor={i}>
        {c.name}
      </label>
    </div>
  ));
};

export default Checkbox;
