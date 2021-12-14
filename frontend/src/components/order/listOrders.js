import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";

import { useSelector, useDispatch } from "react-redux"; //
import { deleteOrder, loadedData } from "../../actions/orderAdminAction";
import "./order.css";
import NavBar from "../../adminComponents/NavBar/NavBar";

const ListOrders = ({ history }) => {
    const userLogin = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLogin;
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const orders = useSelector((state) => state.rootReducer);
    let [localOrder, setLocalOrders] = useState(orders);
    const dispatch = useDispatch();

    const ORDER_STATUS = {
        0: {
            label: "Pending",
            color: "primary",
        },
        1: {
            label: "Processed",
            color: "warning",
        },
        2: {
            label: "Shipped",
            color: "warning",
        },
        3: {
            label: "Deliverd",
            color: "success",
        },
        4: {
            label: "Failed",
            color: "danger",
        },
    };

    const handleDelete = (rowData) => {
        dispatch(deleteOrder(rowData.id));
        toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Order Deleted",
            life: 3000,
        });
    };

    useEffect(() => {
        if (userInfo.length !== 0) {
            if (userInfo.data.user.isAdmin === false) {
                history.push("/");
            } else {
                dispatch(loadedData());
                setLocalOrders(orders);
            }
        } else {
            history.push("/login");
        }
    }, [dispatch, userInfo, history]);

    const header = (
        <div className="table-header">
            <h5 className="p-mx-0 p-my-1">Manage orders</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const editProduct = (rowData) => {
        history.push(`single/${rowData.id}`);
    };
    const statusBodyTemplate = (rowData) => {
        console.log(ORDER_STATUS[rowData.status].color);
        return <Tag severity={ORDER_STATUS[rowData.status].color} value={ORDER_STATUS[rowData.status].label}></Tag>;
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-eye"
                    className="p-button-rounded p-button-success p-mr-2"
                    onClick={() => editProduct(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={() => confirm(rowData)}
                />
            </React.Fragment>
        );
    };

    const confirm = (rowData) => {
        confirmDialog({
            message: `Are you sure you want to delete order ${rowData.id}) `,
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-danger",
            accept: () => handleDelete(rowData),
        });
    };

    return (
        <>
        <NavBar/>
        <div className="container">
            {orders.Data !== 0 && orders.Data && (
                <div className="">
                    <Toast ref={toast} />
                    <DataTable
                        value={orders.Data.data.data}
                        responsiveLayout="scroll"
                        paginator
                        rows={10}
                        resizableColumns
                        olumnResizeMode="fit"
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders"
                        globalFilter={globalFilter}
                        header={header}
                        showGridlines
                        className="p-datatable-products"
                    >
                        <Column field="id" header="id" sortable></Column>
                        <Column field="totalPrice" header="total price" sortable></Column>
                        <Column field="createdAt" header="date ordered" sortable></Column>

                        <Column field="status" header="order status" body={statusBodyTemplate} sortable></Column>

                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: "8rem" }}></Column>
                    </DataTable>
                </div>
            )}
        </div>
        </>
    );
};

export default ListOrders;
