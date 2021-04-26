const scaleSun = 0.001,
  scalePlanetM = 0.033333333,
  scaleDistance = 0.00004,
  earthRadius = 200,
  distanceToSun = 4000;

export const CONFIG = {
  zoom: {
    min: 1.0,
    max: 50.0
  },
  map: {
    size: 30000,
    stars: {
      count: 100,
      width: {
        min: 1,
        max: 9
      }
    }
  },
  planets: {
    scale: 0.5,
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
      distanceToSun: distanceToSun, //57909000
    },
    {
      name: "venus",
      radius: earthRadius,//6051.8 *
      color: "whitesmoke",
      distanceToSun: distanceToSun * 2, //108200000 
    },
    {
      name: "earth",
      radius: earthRadius,//6378.135 *
      color: "steelblue",
      distanceToSun: distanceToSun * 3, //149600000
    }, 
    {
      name: "mars",
      radius: earthRadius * 0.9,//6792.4 / 2
      color: "brown",
      distanceToSun: distanceToSun * 4, //227990000
    },
    {
      name: "jupiter",
      distanceToSun: distanceToSun * 5, //778510000 * scaleDistance,
      radius: earthRadius * 1.1,//142984 / 2 *
      color: "bisque" 
    }]
  }
};
