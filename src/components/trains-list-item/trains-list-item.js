
import './trains-list-item.css';

const TrainsListItem = (props) => {
    
    const {trip, onDelete, date, onUpdate} = props;

    
    return(
        <li className='list-group-item d-flex justify-content-between'>
            <input type="text" name="trip" onChange={onUpdate} className="list-group-item-input" defaultValue={trip}/>
            <input type="text" name="date" onChange={onUpdate} className="list-group-item-input" defaultValue={date}/>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                        onClick={() => onDelete()}
                        className="btn-trash btn-sm ">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
        )
}

export default TrainsListItem;