import { getCateAction , deletCateAction } from "../../actions/cateAction";
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
import NavBar from "../NavBar/NavBar";
import CreateCategory from "./createCategory";
import "./createCategory.css";


const CategoryAdmin = ({ history }) => {
  
  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;

  const { categoryReducer: categories } = useSelector((state) => state);
  const [globalFilter, setGlobalFilter] = useState(null);


  const dispatch = useDispatch();
  const toast = useRef(null);

  useEffect(() => {
    if (userInfo.length === 0 || userInfo.isAdmin === false) {
      history.push("/login");
    } else {
      dispatch(getCateAction());
    }
  }, [dispatch, userInfo]);

  const header = (
    <div className="table-header">
      <h5 className="p-mx-0 p-my-1">Manage Categories</h5>
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

  const actionBodyTemplateDelete = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-trash"
          className=" userDeleteButton p-button-rounded p-button-warning "
          onClick={() => confirm(rowData)}
          label=""
        />
      </React.Fragment>
    );
  };

  const confirm = (rowData) => {
    confirmDialog({
      message: `Are you sure you want to delete this ${rowData.name} `,
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: () => deleletCateOnClick(rowData.id),
    });
  };
 
  const deleletCateOnClick = (id)=>{
     dispatch(deletCateAction(id));   
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Category Deleted",
      life: 3000,
    });
     dispatch(getCateAction());
  }

  const actionBodyTemplateEdite = (rowData, item) => {
    return (
      <>
        <React.Fragment>
          <Link
            className="userEditeLink"
            to={`categoryupdate/${rowData[item.field]}`}
            s
          >
            <i class="fas fa-user-edit userEditeIcon"></i>
          </Link>
        </React.Fragment>
      </>
    );
  };

  return (
    <>
     <NavBar/>
      <div className="datatable-crud-demo">
        <div className=" container ">
          <CreateCategory/>
          {typeof categories.data !== "undefined" && (
            <div className="">
              <Toast ref={toast} />
              <DataTable
                value={categories.data.data}
                responsiveLayout="scroll"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Category"
                globalFilter={globalFilter}
                header={header}
                showGridlines
                className="p-datatable-customers"
              >
                <Column field="name" header="name" sortable></Column>
                <Column field="color" header="color" sortable></Column>
     
                <Column field="id" header="Delete" body={actionBodyTemplateDelete} exportable={false}></Column>
                <Column field="id" header = "Update" body={actionBodyTemplateEdite} exportable={false}
                ></Column>
              </DataTable>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryAdmin;
