import React from "react";

const AdministrationMenu = ({contentHandler}) => {
  return (
    <div className="administration-menu">
      <div className="add-group">
        <div className="header-group" />
        <div className="add-body open">
          <div className="adm-menu-item" name="companies" onClick={e => contentHandler(e)}>Companies</div>
          <div className="adm-menu-item" name="offices" onClick={e => contentHandler(e)}>Offices</div>
          <div className="adm-menu-item"name="users" onClick={e => contentHandler(e)}>Users</div>
          <div className="adm-menu-item"name="merchants" onClick={e => contentHandler(e)}>Merchants</div>
          <div className="adm-menu-item" name="operators" onClick={e => contentHandler(e)}>Operators</div>
        </div>
      </div>
    </div>
  );
};

export default AdministrationMenu;
