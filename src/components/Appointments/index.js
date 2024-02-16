import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarted = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  filteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const {filteredAppointmentList} = this.filteredAppointmentList()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  className="input"
                  placeholder="Title"
                  onChange={this.onChangeTitleInput}
                />
                <label htmlFor="date" className="label">
                  DATE
                </label>
                <input
                  type="text"
                  id="date"
                  value={dateInput}
                  className="input"
                  onChange={this.onChangeDateInput}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="hr" />
            <div className="header-filter-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentDetails={eachItem}
                  toggleIsStarted={this.toggleIsStarted}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
