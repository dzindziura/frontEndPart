import SearchPanel from '../search-panel/search-panel';
import TrainsList from '../trains-list/trains-list';
import TrainsAddForm from '../trains-add-form/trains-add-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './app.css';

const App = (_props) => {
  const HOST = 'http://127.0.0.1:7000';
  const [data, setData] = useState([
    { trip: 'Lviv -> Odessa', date: '20.12.2022', id: 1 },
    { trip: 'Odessa -> Lviv', date: '20.12.2022', id: 2 },
    { trip: 'Rivne -> Kiev', date: '20.12.2022', id: 3 }
  ]);
  const [newDataFromAPI, setNewDataFromAPI] = useState([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    axios.get(`${HOST}/trips/getAll`).then(res => {
      setNewDataFromAPI(res.data);
    })
  }, [])

  const addItem = (trip, where, date) => {
    if (trip.length > 3 && where) {
      const newTrip = `${trip} -> ${where}`;
      axios.post(`${HOST}/posts/add`, { trip: newTrip, date }).then(res => {
        const newData = { _id: res.data.id, trip: newTrip, date };
        setNewDataFromAPI(newDataFromAPI => [...newDataFromAPI, newData])
      });
    }
  }

  const deleteItem = (id) => {
    axios.delete(`${HOST}/trips/${id}/delete`).then(() => {
      setNewDataFromAPI(newDataFromAPI.filter(item => item._id !== id))
    })
  }

  const onUpdate = (id, name, value) => {

    axios.patch(`${HOST}/trips/${id}/update`, { [name]: value });
  }

  const searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.trip.indexOf(term) > -1;
    })
  }

  const onUpdateSearch = (term) => {
    setTerm(term);
  }

  const onToggleIncrease = (id, prop) => {
    setData(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item;
      })
    }))
  }

  const visiableData = searchEmp(newDataFromAPI, term);
  return (
    <div className="app">

      <div className="search-panel">
        <SearchPanel
          onUpdateSearch={onUpdateSearch} />
      </div>

      <TrainsList
        data={visiableData}
        onDelete={deleteItem}
        addItem={addItem}
        onUpdate={onUpdate}
        onToggleIncrease={onToggleIncrease}
      />
      <TrainsAddForm
        addItem={addItem}
      />
    </div>
  )
}


export default App;
