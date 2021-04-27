const earthRadius = 100,
  distanceToSun = 2000;

export const CONFIG = {
  zoom: {
    min: 1.0,
    max: 50.0
  },
  map: {
    size: 35000
  },
  planets: {
    widthSegments: 32,
    heigthSegments: 32,
    list: [
    {
      name: "sun",
      radius: earthRadius * 1.2, //696340
      color: "yellow"
    },
    {
      name: "merkur",
      radius: earthRadius * 0.8,//4879.4 / 2,
      color: "gray",
      distanceToSun: distanceToSun, //57.909.000
    },
    {
      name: "venus",
      radius: earthRadius,//6051.8 *
      color: "whitesmoke",
      distanceToSun: distanceToSun * 2, //108.200.000 
    },
    {
      name: "earth",
      radius: earthRadius,//6378.135 *
      color: "steelblue",
      distanceToSun: distanceToSun * 3, //149.600.000
    }, 
    {
      name: "mars",
      radius: earthRadius * 0.9,//6792.4 / 2
      color: "brown",
      distanceToSun: distanceToSun * 4, //227.990.000
    },
    {
      name: "jupiter",
      distanceToSun: distanceToSun * 5, //778.510.000
      radius: earthRadius * 1.2,//142984 / 2 *
      color: "bisque" 
    },
    {
      name: "saturn",
      radius: earthRadius * 1.2, //120536 / 2
      distanceToSun: distanceToSun * 6, //1.433.400.000
      color: "papayawhip"
    },
    {
      name: "uranus",
      distanceToSun: distanceToSun * 7, // 2.872.400.000
      radius: earthRadius * 1.1, // 51.118 / 2
      color: "#CFF"
    },
    {
      name: "neptun",
      distanceToSun: distanceToSun * 8, // 4.495.000.000
      radius: earthRadius * 1.1, // 49.528
      color: "steelblue"
    }]
  }
};
