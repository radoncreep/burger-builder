import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-f819b.firebaseio.com/'
});

export default instance;













// We are going to configure our instance here with axios
// The reason for this is because we are going to use different endpoints
// In other componenets of our app

