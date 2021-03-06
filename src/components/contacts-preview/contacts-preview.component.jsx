import React from "react";
import { connect } from "react-redux";
import PaginatedTable from "../contacts-table-views/tabular-view/tabular-view.component";
import TiledView from "../contacts-table-views/tiled-view/tiled-view.component";
import { selectVisibleContacts } from "../../redux/contacts/contacts.selector";

import { createStructuredSelector } from "reselect";
import { selectView } from "../../redux/view/view.selector";

const ContactsPreview = ({ view, contacts }) => {
  if (contacts && contacts.length > 0) {
    return (
      <div style={{ width: "90vw" }}>
        {view === "tiled" ? (
          <TiledView data={contacts} />
        ) : (
          <PaginatedTable data={contacts} />
        )}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

const mapStateToProps = () => {
  return createStructuredSelector({
    contacts: selectVisibleContacts,
    view: selectView,
  });
};

export default connect(mapStateToProps)(ContactsPreview);
