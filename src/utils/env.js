var url;

if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:5000'
}

if (process.env.NODE_ENV === 'production') {
    url = 'https://command-helper-api.herokuapp.com/'
}

export default url;