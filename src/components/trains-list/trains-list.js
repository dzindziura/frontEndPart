import TrainsListItem from "../trains-list-item/trains-list-item";

import './trains-list.css';

const TrainsList = ({ data, onDelete, onToggleIncrease, onUpdate }) => {
    const list = data.map(item => {
        const { _id, ...itemProps } = item;
        return <TrainsListItem
            key={_id}
            {...itemProps}
            onDelete={() => onDelete(_id)}
            onUpdate={(e) => onUpdate(_id, e.target.name, e.target.value)}
            onToggleIncrease={(e) => onToggleIncrease(_id, e.currentTarget.getAttribute('data-toggle'))}
        />
    })
    return (

        <ul className="app-list list-group">
            <li className='list-group-item d-flex justify-content-between'>
                <span className="list-group-item-label">Звідки -{">"} Куди</span>
                <span className="list-group-item-label">Коли</span>
                <span className="list-group-item-label">Options</span>
            </li>
            {list}
        </ul>
    )
}

export default TrainsList;