import { useParams } from 'react-router-dom';

const Exercise = () => {

    let {id} = useParams();
    return (
        <div>{id}</div>
    )
};

export default Exercise;