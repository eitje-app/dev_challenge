import { Outlet } from "react-router-dom";
import "./DetailView.css";

const DetailView = () => {
    return (<div className="detail-view">
        <Outlet />
    </div>)
}

export default DetailView;