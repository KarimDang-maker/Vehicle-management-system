<<<<<<< HEAD
# Vehicle-management-system
groupe10_ICT304
=======
# 🚗 Propelize - Vehicle Management System API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![Docker](https://img.shields.io/badge/Docker-✓-blue)

API RESTful complète pour la gestion d'une flotte de véhicules en location, avec système d'authentification et documentation Swagger intégrée.

## 📌 Fonctionnalités

- **CRUD complet** pour les véhicules
- Recherche avancée par immatriculation
- Filtrage par prix maximum
- Documentation interactive avec Swagger UI
- Sécurisation des endpoints critiques
- Architecture conteneurisée avec Docker
- Seed de données initiales

## ⚙️ Stack Technique

### Backend
- **Node.js** (v18+)
- **Express.js** (Framework web)
- **Sequelize** (ORM pour MySQL)
- **Swagger UI** (Documentation API)
- **JWT** (Authentification)

### Infrastructure
- **Docker** + **Docker Compose**
- **MySQL 8.0** (Base de données)
- **Nginx** (Reverse proxy - optionnel)

### Outils
- **Postman** (Collection fournie)
- **ESLint** (Linting du code)
- **Nodemon** (Rechargement automatique)

## 🏗️ Modèle de Données - Véhicule

| Champ             | Type     | Description                          | Exemple          |
|-------------------|----------|--------------------------------------|------------------|
| `id`              | integer  | ID auto-incrémenté                   | 1                |
| `marque`          | string   | Marque du véhicule                   | "Toyota"         |
| `model`           | string   | Modèle du véhicule                   | "Corolla"        |
| `immatriculation` | string   | Plaque unique (format XX-123-XX)     | "AB-123-CD"      |
| `annee`           | integer  | Année de fabrication                 | 2020             |
| `prixLocation`    | float    | Prix journalier (FCFA)               | 35000            |
| `disponible`      | boolean  | Statut de disponibilité              | true             |
| `createdAt`       | datetime | Date de création (auto)              | 2023-01-01T00:00 |
| `updatedAt`       | datetime | Date de modification (auto)          | 2023-01-01T00:00 |

## 🚀 Endpoints

### 🔓 Endpoints Publics

| Méthode | Endpoint                          | Description                          |
|---------|-----------------------------------|--------------------------------------|
| GET     | `/api/vehicules`                 | Liste tous les véhicules             |
| GET     | `/api/vehicules/:id`             | Détails d'un véhicule                |
| GET     | `/api/vehicules/search/:immat`   | Recherche par immatriculation        |
| GET     | `/api/vehicules/price/:maxPrice` | Filtre par prix maximum              |

### 🔐 Endpoints Protégés (Requièrent JWT)

| Méthode | Endpoint                | Description                     |
|---------|-------------------------|---------------------------------|
| POST    | `/api/vehicules`        | Créer un nouveau véhicule       |
| PUT     | `/api/vehicules/:id`    | Mettre à jour un véhicule       |
| DELETE  | `/api/vehicules/:id`    | Supprimer un véhicule           |

### Authentification
```http
Authorization: Bearer votre_token_jwt
>>>>>>> e32cb6029edeb74c9d1a25f364acec4214d1a852
