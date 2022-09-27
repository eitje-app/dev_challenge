import { Outlet } from "react-router-dom";
const DetailView = () => {
    return (<div className="detail-view">
        <Outlet />
    </div>)
}

export default DetailView;