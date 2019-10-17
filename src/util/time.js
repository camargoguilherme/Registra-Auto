import moment from 'moment';

const time = {
  dateHourToString: (date = null) => {
    return moment(date ? Date(parseInt(date)) : Date.now()).format("DD-MM-YYYY HH:mm:ss");
  },
  dateHourPhotoToString: () => {
    return moment(Date.now()).format("YYYYMMDD-HHmmss");
  },
  dateNow: () =>{
    return Date.now();
  }
}

export default time;
