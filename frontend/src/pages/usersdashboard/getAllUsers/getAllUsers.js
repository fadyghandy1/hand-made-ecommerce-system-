import { getUsersAction, deletUserAction } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";

import React from "react";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";

import "./getallusers.css";
import NavBar from "../../../adminComponents/NavBar/NavBar";
export const GetAllUsersPage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;

  const [globalFilter, setGlobalFilter] = useState(null);

  //toast

  const toast = useRef(null);

  const { usersReducer: users } = useSelector((state) => state);

  const dispatch = useDispatch();

  const deleletUserOnClick = (id) => {
    if (id === "619121f0f26540685249ac39") {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "can not delete main admin",
        life: 3000,
      });
    } else {
      dispatch(deletUserAction(id));
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "User Deleted",
        life: 3000,
      });
      dispatch(getUsersAction());
    }
  };

  useEffect(() => {
    if (userInfo.length !== 0) {
      if (userInfo.data.user.isAdmin === false) {
        history.push("/");
      } else {
        dispatch(getUsersAction());
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo]);

  //delete confirm

  const actionBodyTemplateDelete = (rowData) => {
    return (
      <React.Fragment>
        {rowData.id==="619121f0f26540685249ac39"?"":
        <Button
          icon="pi pi-trash"
          className=" userDeleteButton p-button-rounded p-button-warning "
          onClick={() => confirm(rowData)}
          label=""
        />}
      </React.Fragment>
    );
  };

  const confirm = (rowData) => {
    console.log(rowData.id);
    console.log(typeof rowData.id);
    confirmDialog({
      message: `Are you sure you want to delete ${rowData.name} `,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => deleletUserOnClick(rowData.id),
    });
  };

  //edit link

  const actionBodyTemplateEdite = (rowData, item) => {
    return (
      <>
        <React.Fragment>
          {rowData.id === "619121f0f26540685249ac39" ? (
            ""
          ) : (
            <Link
              className="userEditeLink"
              to={`edituser/${rowData[item.field]}`}
              s
            >
              <i class="fas fa-user-edit userEditeIcon"></i>
            </Link>
          )}
        </React.Fragment>
      </>
    );
  };

  // display users role

  const bool = (rowData, item) => {
    if (typeof rowData[item.field] === "boolean") {
      return rowData[item.field] ? "admin" : "user";
    } else {
      return rowData[item.field];
    }
  };

  //filter

  const header = (
    <div className="table-header">
      <h5 className="p-mx-0 p-my-1">Manage Users</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  return (
    <>
      <NavBar />
      <div className="datatable-crud-demo my-5 py-5">
        <div className=" container ">
          {typeof users.data !== "undefined" && (
            <div className="">
              <Toast ref={toast} />
              <DataTable
                value={users.data.data}
                responsiveLayout="scroll"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
                globalFilter={globalFilter}
                header={header}
                showGridlines
                className="p-datatable-customers"
              >
                <Column field="name" header="name" sortable></Column>
                <Column field="email" header="Email" sortable></Column>
                <Column field="phone" header="Phone" sortable></Column>
                <Column field="country" header="Country" sortable></Column>
                <Column field="city" header="City" sortable></Column>
               
                <Column
                  field="isAdmin"
                  header="Role"
                  body={bool}
                  sortable
                ></Column>
                <Column
                  field="id"
                  header="Delete"
                  body={actionBodyTemplateDelete}
                  exportable={false}
                ></Column>
                <Column
                  field="id"
                  header="Update"
                  body={actionBodyTemplateEdite}
                  exportable={false}
                ></Column>
              </DataTable>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
