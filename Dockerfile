# Dockerfile

FROM node:20

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package*
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code
COPY . .

# Exposer le port
EXPOSE 3000

# Commande de lancement
CMD ["npm", "run", "dev"]
