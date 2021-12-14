import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ColorPicker } from "primereact/colorpicker";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "./createCategory.css";

import { createCategoryAction } from "../../actions/cateAction";
const CreateCategory = () => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState("center");

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const [color2, setColor2] = useState("1976D2");

  const initialCateState = {
    id: null,
    name: "",
    color: "",
    icon: "",
  };

  const [categoryCrate, setCategoryCrate] = useState(initialCateState);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryCrate({ ...categoryCrate, [name]: value });
  };

  const saveUser = () => {
    const { name, icon } = categoryCrate;

    dispatch(createCategoryAction(name, color2, icon))
      .then((data) => {
        setCategoryCrate({
          id: data.id,
          name: data.name,

          icon: data.icon,
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
        <Button
          label="Okay"
          icon="pi pi-check"
          onClick={() => {
            onHide(name);
            setSubmitted(false);
          }}
          autoFocus
        />
      </div>
    );
  };

  return (
    <>
      <Button
        label="Add Category"
        icon="pi pi-external-link"
        onClick={() => onClick("displayBasic")}
      />

      <Dialog
        header="Add Category"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => onHide("displayBasic")}
      >
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>successfully</h4>
            </div>
          ) : (
            <div className="continer-admin-dialog">
              <div className="form-group">
                <label htmlFor="username">Name</label>
                <input
                  type="text"
                  className="form-control input-field-admin"
                  id="name"
                  required
                  value={categoryCrate.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Color</label>

                <ColorPicker
                  value={color2}
                  onChange={(e) => setColor2(e.value)}
                ></ColorPicker>
              </div>
             

              <button onClick={saveUser} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default CreateCategory;
