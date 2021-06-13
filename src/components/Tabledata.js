import React from "react";

const Tabledata = (props) => {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.fname}</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
  );
};

export default Tabledata;
