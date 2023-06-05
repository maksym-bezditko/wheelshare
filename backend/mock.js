const generateCarArray = () => {
  const carArray = [];

  const brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Nissan', 'Volkswagen', 'Hyundai'];
  const models = ['Camry', 'Civic', 'Mustang', 'Cruze', 'X5', 'E-Class', 'A4', 'Altima', 'Golf', 'Elantra'];
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const carClasses = ["Sedan", "SUV", "Hatchback", "Sports"];
  const prices = [100, 150, 125, 70, 300, 400, 255, 345, 230, 550];
  const images = [
    'https://stimg.cardekho.com/images/carexteriorimages/930x620/Toyota/Camry/8733/1677916969153/front-left-side-47.jpg',
    'https://media.ed.edmunds-media.com/honda/civic/2023/oem/2023_honda_civic_sedan_si_fq_oem_1_1600.jpg',
    'https://cdn.motor1.com/images/mgl/6MqJZ/s3/ford-mustang-shelby-gt500-imported-by-peicher-us-cars.jpg',
    'https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2023/01/17092350/chevrolet-cruze-history-_-Cover-1-17-1-23.jpg',
    'https://mediacloud.carbuyer.co.uk/image/private/s--VfWlNFGx--/v1609948123/autoexpress/2021/01/New%20BMW%20X5%20M%20Competition%202021%20UK-16.jpg',
    'https://www.edmunds.com/assets/m/cs/bltc2f0d709f45cdfea/6447201f1d4d37184e1ce056/2024_Mercedes-Benz_E-Class_7_1600.jpg',
    'https://cdni.autocarindia.com/ExtraImages/20220208104501_Audi_A4_LT_1.jpg',
    'https://i.ytimg.com/vi/9QTWBF_hn8Y/maxresdefault.jpg',
    'https://imgd.aeplcdn.com/1280x720/n/cw/ec/51227/volkswagen-gti-2016-2019-right-front-three-quarter10.jpeg?wm=0',
    'https://avatars.mds.yandex.net/get-verba/937147/2a00000175fead183f8c2b9a9f66141d34cf/cattouchret',
  ];

  for (let i = 0; i < 10; i++) {
    const car = {
      id: `car_${i + 1}`,
      imageUrl: images[i],
      brand: brands[i],
      model: models[i],
      _class: carClasses[i % carClasses.length],
      location: locations[i],
      costPerHour: prices[i], // Random cost per hour between 20 and 119
    };

    carArray.push(car);
  }

  return carArray;
};

module.exports = {
  cars: generateCarArray()
}