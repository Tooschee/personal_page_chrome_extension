const config = {};

config.links = {
  main: [
    {
      name: 'gmail',
      link: 'https://mail.google.com',
    },
    {
      name: 'calendar',
      link: 'https://calendar.google.com/calendar',
    },
    {
      name: 'drive',
      link: 'https://drive.google.com/drive/my-drive',
    },
    {
      name: 'keep',
      link: 'https://keep.google.com/',
    },
    {
      name: 'maps',
      link: 'https://www.google.com/maps',
    },
    {
      name: 'gtranslate',
      link: 'https://translate.google.com/',
    },
  ],
  group1: [
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    }
  ],
  group2: [
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    },
    {
      name: 'your link',
      link: 'https://yourlink.com',
    }
  ],
};

// works really well with https://api.openweathermap.org/
config.weather = {
  url: 'https://api.openweathermap.org/data/2.5/weather',
  apiKey: '',
  location: 'Wroclaw,pl',
  lang: 'en',
  units: 'metric',
  updateFrequency: 6000, // loop in miliseconds
};

// Google Api
config.gapi = {
  clientId: '',
  apiKey: '',
}

config.calendar = {
  updateFrequency: 10000, // loop in miliseconds
}

// firebase config
config.firebase = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
}

// this is done to ommit the whole sing-in processes, not needed since only ONE user will be working with this data
// you should write you own data here, that you set in firebase (realtime database should have acces by at least one user)
// with this credentials (Firebase -> Authentication -> Users -> activate by email -> add user here)
config.user = {
  email: '',
  pass: '',
};

export default config;
