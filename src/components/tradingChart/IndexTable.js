import React from "react";
import Table from "react-bootstrap/Table";

function renderTableData(data) {
  return data.map((item) => (
    <tr key={item.assetId} style={{ textAlign: 'center' }}>
      <td>{item.assetId}</td>
      <td>${item.currentPrice.toFixed(2)}</td>
      <td>{(item.currentWeight * 100).toFixed(2)}%</td>
    </tr>
  ));
}

const IndexTable = (props) => {
  return (
    <div>
      <h4 align="left">HDAI Index Constituents</h4>
      <Table hover>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Price</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>{renderTableData(props.constituents)}</tbody>
      </Table>
    </div>
  );
};

export default IndexTable;
