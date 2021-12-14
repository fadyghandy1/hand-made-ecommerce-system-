// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

// const DataTableSortDemo = () => {
//     const [products, setProducts] = useState([]);
//     const [multiSortMeta, setMultiSortMeta] = useState([{ field: 'category', order: -1 }]);
//     // const productService = new ProductService();

//     useEffect(() => {
//         productService.getProductsSmall().then(data => setProducts(data));
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps

//     const formatCurrency = (value) => {
//         return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
//     }

//     const priceBodyTemplate = (rowData) => {
//         return formatCurrency(rowData.price);
//     }

//     return (
//         <div>
//             <div className="card">
//                 <h5>Single Column</h5>
//                 <DataTable value={products} responsiveLayout="scroll">
//                     <Column field="code" header="Code" sortable></Column>
//                     <Column field="name" header="Name" sortable></Column>
//                     <Column field="category" header="Category" sortable></Column>
//                     <Column field="quantity" header="Quantity" sortable></Column>
//                     <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
//                 </DataTable>
//             </div>