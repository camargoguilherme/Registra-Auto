import moment from 'moment';

const time = {
  dateHourToString: (date) =>{
    return moment(Date.now()).format("DD/MM/YYYY HH:mm:ss");
  }
}

export default time;