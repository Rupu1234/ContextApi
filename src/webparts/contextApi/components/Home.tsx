import * as React from "react";
import "./Home.css";
import { Myapicnx } from "../components/MyapiContext";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import CreateIcon from "@material-ui/icons/Create";
// import { sp } from "@pnp/sp/presets/all";
import * as moment from "moment";

const Home = (props) => {
  const { state, dispatch } = React.useContext(Myapicnx);

  const [open, setOpen] = React.useState(false);
  const [IsEdit, setIsEdit] = React.useState(false);
  const [IsView, setIsView] = React.useState(false);
  const [IsNew, setIsNew] = React.useState(false);
  const [id, setId] = React.useState<number>(null);
  const [isIndex, setisindex] = React.useState(null);
  const [Name, setname] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [ReviewerName, setReviewerName] = React.useState("");
  const [DateReviewer, setDateReviewer] = React.useState("");
  const [TrainingExpiryDate, setTrainingExpiryDate] = React.useState("");
  const [StatusofTraining, setStatusofTraining] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setIsNew(true);
    setname("");
    setDescription("");
    setReviewerName("");
    setDateReviewer("");
    setTrainingExpiryDate("");
    setStatusofTraining("");
  };
  const viewhandle = (index) => {
    setOpen(true);
    setIsView(true);
    const Viwearray = state.MyDatas[index];
    setname(Viwearray.Name);
    setDateReviewer(Viwearray.DateReviewer);
    setDescription(Viwearray.Description);
    setReviewerName(Viwearray.ReviewerName);
    setStatusofTraining(Viwearray.StatusofTraining);
    setTrainingExpiryDate(Viwearray.TrainingExpiryDate);
  };

  const handleClose = () => {
    setOpen(false);
    // setTimeout(() => {
    setIsEdit(false);
    setIsView(false);
    setIsNew(false);
    // }, 1000);
  };

  const onnew = () => {
    props.sp.web.lists
      .getByTitle("ContextApi")
      .items.add({
        Title: Name,
        Description: Description,
        ReviewerName: ReviewerName,
        DateReviewer: DateReviewer,
        TrainingExpiryDate: TrainingExpiryDate,
        Status: StatusofTraining,
      })
      .then((arr) => {
        console.log(arr);
      })
      .catch((err) => {
        console.log(err);
      });

    let Temp = [];
    if (state.MyDatas?.length > 0) {
      Temp = [
        ...state.MyDatas,
        {
          Name,
          Description,
          ReviewerName,
          DateReviewer,
          TrainingExpiryDate,
          StatusofTraining,
        },
      ];
    } else {
      Temp = [
        {
          Name,
          Description,
          ReviewerName,
          DateReviewer,
          TrainingExpiryDate,
          StatusofTraining,
        },
      ];
    }
    dispatch({
      type: "ADD_NEW",
      payload: Temp,
    });
    setOpen(false);
    setIsEdit(false);
    setIsNew(false);
    setIsView(false);
  };

  const handleEdit = (index, val) => {
    setIsNew(false);
    setIsView(false);
    const newarray = state.MyDatas[index];
    setname(newarray.Name);
    setDateReviewer(newarray.DateReviewer);
    setDescription(newarray.Description);
    setReviewerName(newarray.ReviewerName);
    setStatusofTraining(newarray.StatusofTraining);
    setTrainingExpiryDate(newarray.TrainingExpiryDate);
    setisindex(index);
    setId(val.ID);
    debugger;
    setOpen(true);
    setIsEdit(true);
  };

  const handleupdate = () => {
    props.sp.web.lists
      .getByTitle("ContextApi")
      .items.getById(id)
      .update({
        Title: Name,
        Description: Description,
        DateReviewer: DateReviewer,
        TrainingExpiryDate: TrainingExpiryDate,
        Status: StatusofTraining,
        ReviewerName: ReviewerName,
      })
      .then((res) => {
        if (isIndex !== null) {
          let updatevalue = [...state.MyDatas];
          updatevalue[isIndex] = {
            ...updatevalue[isIndex],
            Name: Name,
            Description: Description,
            DateReviewer: DateReviewer,
            TrainingExpiryDate: TrainingExpiryDate,
            StatusofTraining: StatusofTraining,
            ReviewerName: ReviewerName,
          };

          dispatch({
            type: "Edit",
            payload: updatevalue,
          });
        }
        setOpen(false);
        setIsEdit(false);
        setisindex(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandle = (i, val) => {
    setId(val.ID);
    props.sp.web.lists
      .getByTitle("ContextApi")
      .items.getById(id)
      .delete()
      .then((res) => {
        const newArray = [...state.MyDatas];
        newArray.splice(i, 1);
        dispatch({
          type: "Delete",
          payload: newArray,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="Holldiv">
        <div className="Heading">
          <h1>Crud Operation</h1>
        </div>

        <div className="addnewbtn">
          <input
            placeholder="Search..."
            style={{
              border: "1px solid #dddddd",
              borderRadius: "3px",
              marginRight: "10px",
              height: "4.2vh",
              width: "12%",
            }}
          ></input>
          <Button variant="contained" onClick={handleClickOpen}>
            Add
          </Button>
        </div>

        <h1>Main component</h1>
        <table>
          <tr style={{ color: "#1976d2" }}>
            <th>Name</th>
            <th>Description</th>
            <th>Reviewer Name </th>
            <th>Date Reviewer</th>
            <th>Training Expiry Date</th>
            <th>Status of Training</th>
            <th>View</th>
            <th>Action</th>
          </tr>

          {state.MyDatas?.map((item, index) => (
            <tr key={index}>
              <td>{item.Name}</td>
              <td>{item.Description}</td>
              <td>{item.ReviewerName}</td>
              <td>{moment(item.DateReviewer).format("DD-MM-yyyy")}</td>
              <td>{moment(item.TrainingExpiryDate).format("DD-MM-yyyy")}</td>
              <td>{item.StatusofTraining}</td>

              <td>
                {
                  <VisibilityIcon
                    onClick={() => viewhandle(index)}
                    style={{ color: "#1976d2" }}
                  />
                }
              </td>
              <td>
                {
                  <>
                    <CreateIcon onClick={() => handleEdit(index, item)} />
                    <DeleteRoundedIcon
                      onClick={() => deleteHandle(index, item)}
                      style={{ color: "Red" }}
                    />
                  </>
                }
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="Popup">
        <Dialog
          // fullScreen={fullScreen}
          open={open}
          // onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          style={{ padding: "20px", height: "auto" }}
        >
          <div style={{ padding: "10px 0 0 20px" }}>
            <h2 style={{ margin: "0px", fontFamily: "sans-serif" }}>
              {IsEdit ? "Update item" : IsView ? "View item" : "New item"}
            </h2>
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ padding: " 20px", width: "50%" }}>
              <label style={{ fontFamily: "sans-serif" }}>Name</label>
              <input
                disabled={IsView == true}
                value={Name}
                type="text"
                onChange={(e) => setname(e.target.value)}
                style={{ width: "100%", height: "25px", marginTop: "7px" }}
              />
              <br />
              <br />
              <label style={{ fontFamily: "sans-serif" }}>Description</label>
              <input
                value={Description}
                disabled={IsView == true}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", height: "25px", marginTop: "7px" }}
              />
              <br />
              <br />
              <label style={{ fontFamily: "sans-serif" }}>Reviewer Name</label>
              <input
                value={ReviewerName}
                disabled={IsView}
                type="text"
                onChange={(e) => setReviewerName(e.target.value)}
                style={{ width: "100%", height: "25px", marginTop: "7px" }}
              />
              <br />
              <br />
            </div>
            <div style={{ padding: "20px", width: "50%" }}>
              <label style={{ fontFamily: "sans-serif" }}>Date Reviewer</label>
              <input
                value={DateReviewer}
                disabled={IsView}
                type="date"
                onChange={(e) => setDateReviewer(e.target.value)}
                style={{ width: "100%", height: "25px", marginTop: "7px" }}
              />
              <br />
              <br />
              <label style={{ fontFamily: "sans-serif" }}>
                Training Expiry Date
              </label>
              <input
                value={moment(TrainingExpiryDate).format("DD-MM-yyyy")}
                disabled={IsView}
                type="date"
                onChange={(e) => setTrainingExpiryDate(e.target.value)}
                style={{ width: "100%", height: "25px", marginTop: "7px" }}
              />
              <br />
              <br />
              <label style={{ fontFamily: "sans-serif" }}>
                Status of Training
              </label>
              <input
                type="text"
                disabled={IsView == true}
                onChange={(e) => setStatusofTraining(e.target.value)}
                value={StatusofTraining}
                style={{ width: "100%", height: "25px", marginTop: "7px" }}
              />
              <br />
              <br />
            </div>
          </div>

          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Cancel
            </Button>

            {IsView == false ? (
              <Button
                variant="contained"
                autoFocus
                onClick={() => (IsEdit ? handleupdate() : IsNew ? onnew() : "")}
              >
                {IsEdit ? "Update" : "submit"}
              </Button>
            ) : (
              ""
            )}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Home;
