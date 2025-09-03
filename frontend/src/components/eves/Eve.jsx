import React from "react";
import { useDispatch } from "react-redux";
import { removeeveAction } from "../../redux/slice/eventSlice";
import { useNavigate, useParams } from "react-router-dom";
// import poster from "../../assets/profile.png";
import "../eves/event.css";

const Eve = ({ id, title, poster }) => {
  console.log("id:", id);
  console.log("title:", title);
  console.log("poster:", poster);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(removeeveAction(id));
    }
  };

  const handleView = () => {
    navigate(`/event/eventinfo/${title}/${id}`);
  };
  const handleUpdate = () => {
    navigate(`/event/eventinfo/update/${title}/${id}`);
  };
  const handleviewregs = () => {
    navigate(`/event/admin/studentregs/${id}`)
}
  return (
    <div className="event-container">
      <div className="event-card">
        <span>{id}.</span>
        <img src={poster} alt="Event Poster" className="event-image" />
        <div className="event-content">
          <h3>{title}</h3>
          <div className="event-details">
            <h5>for more information click view details</h5>
          </div>
          <div className="event-buttons">
            <button onClick={handleUpdate} className="update">
              Update
            </button>
            <button onClick={handleView} className="view-details">
              View Details
            </button>
            <button onClick={() => handleDelete(id)} className="remove">
              Delete
            </button>
          </div>
          <div className="reg-buttons">
                    <button  onClick={handleviewregs} className="viewregs">View Registrations</button>
                </div>
        </div>
      </div>
    </div>
  );
};
export default Eve;
