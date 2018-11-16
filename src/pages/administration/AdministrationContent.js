import React from "react";
import DataTable from "../../components/DataTable";

const AdministrationContent = (props) => {
  return (
    <div className="administration-content">
      <div className="add-group">
        {props.administrComponent}
      </div>
    </div>
  );
};

export default AdministrationContent;
