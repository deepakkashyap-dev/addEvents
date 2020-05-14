import React from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import Moment from 'react-moment';
import moment from 'moment/moment.js'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export const Total_data=[
  {"id":1,"date":"2020,2,10","eventName":"nano"},
  {"id":2,"date":"2020,5,10","eventName":"nano1"},
  {"id":3,"date":"2020,3,10","eventName":"nano2"},
  {"id":4,"date":"2020,6,10","eventName":"nano3"},
  {"id":5,"date":"2020,7,10","eventName":"nano4"},
  {"id":6,"date":"2020,3,10","eventName":"nano5"},
  {"id":7,"date":"2020,5,15","eventName":"nano6"},
]

const Display = (props) =>{
  return(
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Schedule again</th>
          </tr>
        </thead>
        <tbody>
          
          {props.data.map((data,i)=>{
              return(
                <tr>
                  <td>
                    <Moment format='MMMM Do YYYY'>{data.date}</Moment><br/>
                    <Moment fromNow style={{opacity:"0.5"}}>{data.date}</Moment>
                  </td>
                  <td>{data.eventName}</td>
                  <td onClick={() =>props.reSchedule(data.id)}>Schedule again</td>
                  
                </tr>
                );
              }
              )}          
        </tbody>
      </Table>
  );
  }
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      total_data:Total_data || [],
      data_to_render: [],
      screen:"upcoming",
      showCalendar:false,
      eventDate:"",
      eventID:null,
    }
  }

  
componentDidMount(){
  this.show("upcoming")
  
}


  show=(props)=>{
    let today = new Date();
    let filtered_data = this.state.total_data.filter(item => {
    let date = new Date(item.date);
    // var date = moment(item.date)
    if(props==="upcoming"){
      return date > today ;}
    if(props==="live"){
      return today.getDate() == date.getDate() && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear()   ;}
    if(props==="past"){
      return date < today ;}
   })
   this.setState({data_to_render:filtered_data,screen:props})
   
  }
  
  reSchedule=(id)=>{
    const showCalendar = this.state.showCalendar;
    const data = this.state.data_to_render.filter(item => {
      return item.id==id
    })
    this.setState({showCalendar: !showCalendar,eventDate:data[0].date,eventID:data[0].id})
  }

  onChange=(props)=>{
    const {showCalendar,eventID} = this.state;
    const newDate= props.getFullYear() + "," + (props.getMonth()+1) +","+ props.getDate()
    const objIndex = Total_data.filter(item => item.id == eventID)//.date=newDate
          objIndex[0].date=newDate
    this.setState({total_data:Total_data,showCalendar: !showCalendar})
      }

  render(){
  const {showCalendar,eventDate}=this.state

  return (

    <div className="App">
      <div>
        <button onClick={() =>this.show("upcoming")}>Upcoming</button>
        <button onClick={() =>this.show("live")}>Live</button>
        <button onClick={() =>this.show("past")}>Past</button>
      </div>
      <hr/>
      <br/>
      <div>
        <Display data={this.state.data_to_render} reSchedule={this.reSchedule}/>
      </div>
      {showCalendar && <Calendar
                        onChange={this.onChange}
                        value={new Date(eventDate)}
                      />
          }
    </div>
  );
  }
}

export default App;
