import * as React from "react";
import { Myapicnx } from "./MyapiContext";
import * as moment from "moment";

const Test = (props: any) => {
  const { state } = React.useContext(Myapicnx);

  return (
    <div>
      <h1>another component</h1>
      <table>
        <tr style={{ color: "#1976d2" }}>
          <th>Name</th>
          <th>Description</th>
          <th>Reviewer Name </th>
          <th>Date Reviewer</th>
          <th>Training Expiry Date</th>
          <th>Status of Training</th>
        </tr>

        {state.MyDatas?.map((item, index) => (
          <tr key={index}>
            <td>{item.Name}</td>
            <td>{item.Description}</td>
            <td>{item.ReviewerName}</td>
            <td>{moment(item.DateReviewer).format("DD-MM-yyyy")}</td>
            <td>{moment(item.TrainingExpiryDate).format("DD-MM-yyyy")}</td>
            <td>{item.StatusofTraining}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Test;
