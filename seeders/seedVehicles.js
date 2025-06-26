const { sequelize } = require('../config/db');
const Vehicle = require('../models/vehicle.model');

const seedVehicles = async () => {
  try {
    await sequelize.sync({ force: true }); // ⚠️ supprime et recrée les tables

    const vehicles = [
      {
        marque: 'Toyota',
        model: 'Yaris',
        immatriculation: 'AA-111-AA',
        annee: 2020,
        prixLocation: 35000,
        disponible: true
      },
      {
        marque: 'Renault',
        model: 'Clio',
        immatriculation: 'BB-222-BB',
        annee: 2019,
        prixLocation: 30000,
        disponible: true
      },
      {
        marque: 'Peugeot',
        model: '208',
        immatriculation: 'CC-333-CC',
        annee: 2021,
        prixLocation: 32000,
        disponible: false
      },
      {
        marque: 'Volkswagen',
        model: 'Golf',
        immatriculation: 'DD-444-DD',
        annee: 2018,
        prixLocation: 38000,
        disponible: true
      },
      {
        marque: 'BMW',
        model: 'Serie 3',
        immatriculation: 'EE-555-EE',
        annee: 2022,
        prixLocation: 60000,
        disponible: true
      },
      {
        marque: 'Mercedes',
        model: 'Classe A',
        immatriculation: 'FF-666-FF',
        annee: 2021,
        prixLocation: 55000,
        disponible: false
      },
      {
        marque: 'Audi',
        model: 'A3',
        immatriculation: 'GG-777-GG',
        annee: 2020,
        prixLocation: 50000,
        disponible: true
      },
      {
        marque: 'Citroën',
        model: 'C3',
        immatriculation: 'HH-888-HH',
        annee: 2019,
        prixLocation: 28000,
        disponible: true
      },
      {
        marque: 'Ford',
        model: 'Fiesta',
        immatriculation: 'II-999-II',
        annee: 2018,
        prixLocation: 27000,
        disponible: false
      },
      {
        marque: 'Hyundai',
        model: 'i20',
        immatriculation: 'JJ-000-JJ',
        annee: 2021,
        prixLocation: 33000,
        disponible: true
      },
      {
        marque: 'Kia',
        model: 'Rio',
        immatriculation: 'KK-111-KK',
        annee: 2020,
        prixLocation: 31000,
        disponible: true
      },
      {
        marque: 'Nissan',
        model: 'Micra',
        immatriculation: 'LL-222-LL',
        annee: 2019,
        prixLocation: 29000,
        disponible: false
      },
      {
        marque: 'Opel',
        model: 'Corsa',
        immatriculation: 'MM-333-MM',
        annee: 2022,
        prixLocation: 34000,
        disponible: true
      },
      {
        marque: 'Fiat',
        model: '500',
        immatriculation: 'NN-444-NN',
        annee: 2021,
        prixLocation: 36000,
        disponible: true
      },
      {
        marque: 'Dacia',
        model: 'Sandero',
        immatriculation: 'OO-555-OO',
        annee: 2020,
        prixLocation: 25000,
        disponible: false
      },
      {
        marque: 'Skoda',
        model: 'Fabia',
        immatriculation: 'PP-666-PP',
        annee: 2019,
        prixLocation: 32000,
        disponible: true
      },
      {
        marque: 'Seat',
        model: 'Ibiza',
        immatriculation: 'QQ-777-QQ',
        annee: 2021,
        prixLocation: 35000,
        disponible: true
      },
      {
        marque: 'Suzuki',
        model: 'Swift',
        immatriculation: 'RR-888-RR',
        annee: 2020,
        prixLocation: 31000,
        disponible: false
      },
      {
        marque: 'Mazda',
        model: '2',
        immatriculation: 'SS-999-SS',
        annee: 2022,
        prixLocation: 37000,
        disponible: true
      },
      {
        marque: 'Volvo',
        model: 'V40',
        immatriculation: 'TT-000-TT',
        annee: 2021,
        prixLocation: 52000,
        disponible: true
      }
    ];

    await Vehicle.bulkCreate(vehicles);

    console.log('✅ 20 véhicules insérés avec succès.');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors du seeding :', error.message);
    process.exit(1);
  }
};

seedVehicles();