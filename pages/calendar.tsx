import Layout from "./layout";
import { ViewState } from '@devexpress/dx-react-scheduler';
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui';


const currentDate = '2020-10-05';
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



export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: schedulerData,
      currentDate: currentDate
    };
  }

  render() {

    return (
      <Layout>
        <div className="container">
          <Paper>
            <Scheduler
              locale='es-ES'
              data={schedulerData}
            >
              <ViewState
                currentDate={currentDate}
              />
              <WeekView
                startDayHour={5}
                endDayHour={24}
              />
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