import * as React from "react";
import "./../../../ExternalRef/Style.css";
import Home from "./Home";
import { Myapicnx } from "./MyapiContext";
import { cruds, initialState } from "./Reducer";
import Test from "./Test";
import * as moment from "moment";
import SPServices from "../../config/SPServices";

const ListName = "ContextApi";

const Maincomponent = (props) => {
  let Mycontext = props;

  const [state, dispatch] = React.useReducer(cruds, initialState);
  const [Data, setData] = React.useState([]);

  console.log("state", state);
  const check = Mycontext.context._pageContext._user.email;
  console.log(check, "check");

  const fetchData = async () => {
    SPServices.SPReadItems({
      Listname: "ContextApi",
      Select: "*",
    })
      .then((res: any) => {
        let arr = [];
        const transformedData = res?.map((val) => {
          arr.push({
            Name: val?.Title,
            Description: val?.Description,
            ReviewerName: val?.ReviewerName,
            DateReviewer: moment(val?.DateReviewer).format("MM/DD/YYYY"),
            //   TrainingExpiryDate: val?.TrainingExpiryDate,
            TrainingExpiryDate: moment(val?.TrainingExpiryDate).format(
              "MM/DD/YYYY"
            ),
            StatusofTraining: val?.Status,
            ID: val?.ID,
          });
        });
        setData(arr);
        dispatch({
          type: "Edit",
          payload: arr,
        });
        dispatch({
          type: "MyContextData",
          payload: Mycontext,
        });
        console.log(arr, "arr");
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {/* <Myapicnx.Provider value={{ state, dispatch }}> */}
        <Home sp={props.sp} />
        <Test />
        {/* </Myapicnx.Provider> */}
      </div>
    </>
  );
};

export default Maincomponent;
