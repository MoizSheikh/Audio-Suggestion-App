const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "mysecretkey",
    // DATABASE: 'mongodb+srv://jealla:jealla@cluster0.nwthj.mongodb.net/jealla?retryWrites=true&w=majority'
    DATABASE: "mongodb://localhost/audioTracks",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
