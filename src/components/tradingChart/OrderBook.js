import React from "react";
import Table from "react-bootstrap/Table";

function renderData(data) {
  let rows = [];
  for (let i = 0; i < 14; i++) {
    rows.push(
      <tr key={i}>
        <td>
          {(data["bids"][i][1] * data["bids"][i][0]).toFixed(8).toString()}
        </td>
        <td>{Number(data["bids"][i][1]).toString()}</td>
        <td>{Number(data["bids"][i][0]).toString()}</td>
        <td>{Number(data["asks"][i][0]).toString()}</td>
        <td>{Number(data["asks"][i][1]).toString()}</td>
        <td>
          {(data["asks"][i][1] * data["asks"][i][0]).toFixed(8).toString()}
        </td>
      </tr>
    );
  }
  return rows;
}

const OrderBook = (props) => {
  if (props.book === undefined) {
    return null;
  } else {
    return (
      <div>
        <h4 align="left">OrderBook</h4>
        <Table>
          <tbody>
            <tr>
              <th>Total({props.quote})</th>
              <th>Quantity</th>
              <th>Bid</th>
              <th>Ask</th>
              <th>Quantity</th>
              <th>Total({props.quote})</th>
            </tr>
            {renderData(props.book)}
          </tbody>
        </Table>
      </div>
    );
  }
};

export default OrderBook;
