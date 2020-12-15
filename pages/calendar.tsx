import Layout from "./layout";
import { ViewState } from '@devexpress/dx-react-scheduler';
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  DateNavigator,
  CurrentTimeIndicator,
  ViewSwitcher,
  MonthView,
  DayView,
} from '@devexpress/dx-react-scheduler-material-ui';

function getCurrentDate() {
  var date = new Date()
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return year + '-' + month + '-' + day;
}

const currentDate = getCurrentDate();
const schedulerData = [
  { startDate: '2020-10-06T09:45', endDate: '2020-10-06T11:00', title: 'Parqueo Reservado', color: "#077187" },
  { startDate: '2020-10-07T12:00', endDate: '2020-10-07T13:30', title: 'Parqueo Reservado', color: "#077187" },
  { startDate: '2020-10-08T09:45', endDate: '2020-10-08T11:00', title: 'Tu reserva', color: "#63C7B2" },
];

/*const Appointment = ({ children, style, data, resources, ...restProps }) => (
  <Appointments.Appointment
    style={{
      ...style,
      backgroundColor: data.color,
      borderRadius: "8px"
    }}
    draggable={false}
    data={data}
    resources={resources}
    {...restProps}
  >
    {children}
  </Appointments.Appointment>
);*/
type MyProps = { currentViewNameChange: (currentViewName: any) => void };
type MyState = { currentViewName: string, data: {}, currentDate: string };

export default class Calendar extends React.PureComponent<MyProps, MyState> {
  currentViewNameChange: (currentViewName: any) => void
  constructor(props) {
    super(props);

    this.state = {
      data: schedulerData,
      currentDate: currentDate,
      currentViewName: 'Week',
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
  }

  render() {
    const { currentViewName } = this.state;

    return (
      <Layout>
        <div className="container">
          <Paper>
            <Scheduler
              locale='es-ES'
              data={schedulerData}
            >

              <ViewState
                defaultCurrentDate={currentDate}
                currentViewName={currentViewName}
                onCurrentViewNameChange={this.currentViewNameChange}

              />

              <WeekView
                startDayHour={5}
                endDayHour={24}
              />
              <MonthView />
              <DayView />
              <Toolbar />
              <ViewSwitcher />
              <DateNavigator />
              <Appointments
                /*appointmentComponent={Appointment}*/ />
              <CurrentTimeIndicator />
            </Scheduler>
          </Paper>
        </div>
        <style jsx>{`
              .container{
                margin:0;
                width:99vw;
                padding:0;
              }
            `}</style>
      </Layout>
    );
  }
}