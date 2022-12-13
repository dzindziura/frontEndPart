import { Component } from "react"
import './trains-add-form.css';


class TrainsAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: '',
            where: '',
            date: ''
        }
    }

    getName = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { trip, salary, date } = this.state;
        this.props.addItem(trip, salary, date);
        this.setState({
            trip: '',
            where: '',
            date: ''
        })
    }
    render() {
        const { trip, where, date } = this.state;
        const { addItem } = this.props;
        return (
            <div className="app-add-form">
                <h3>Добавити новий рейс</h3>
                <form
                    onSubmit={this.onSubmit}
                    className="add-form d-flex">
                    <input type="text"
                        onChange={this.getName}
                        name="trip"
                        value={trip}
                        className="form-control new-post-label"
                        placeholder="Звідки?" />
                    <input type="text"
                        name="where"
                        value={where}
                        onChange={this.getName}
                        className="form-control new-post-label"
                        placeholder="Куда?" />
                    <input type="date"
                        name="date"
                        value={date}
                        onChange={this.getName}
                        className="form-control new-post-label"
                        placeholder="Коли?" />

                    <button type="button"
                        className="btn btn-outline-light"
                        onClick={() => addItem(trip, where, date)}>Добавити</button>
                </form>
            </div>
        )
    }
}

export default TrainsAddForm;