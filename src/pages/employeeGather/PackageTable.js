import "../../assets/css/Datatable.min.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Packagetable = (props)=> {
  const [dataRows, setDataRows] = useState([]);
  const [dataColumns, setDataColumns] = useState([]);
  const [object, setObject] = useState('');
  useEffect(() => {
      // Update the data in the component whenever props change
      if (props.dataRows) {
        setDataRows(props.dataRows);
      }
      
  }, [props.dataRows]);
  
  useEffect(() =>{
    if (props.dataColumns) {
      setDataColumns(props.dataColumns);
    }
  }, [props.dataColumns])

  useEffect(() =>{
    if (props.object) {
      setObject(props.object);
    }
  }, [props.object])
  const handleDelete = (id) => {
    setDataRows(dataRows.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/viewReceipt/"+ params.row.id } style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link to={"/"+object+"Form/"+ params.row.id } style={{ textDecoration: "none" }}>
              <div className="formButton">Form</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {object}
      </div>
      <DataGrid
        className="datagrid"
        rows={dataRows}
        columns={dataColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Packagetable;