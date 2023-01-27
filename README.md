# Projet par P. Thomas et L. Sonny

API : TypeScript / Express
Front : TypeScript / React / CSS Maison

## API

Les commandes pour build et lancer l'API

### `npm install`

> Installe toutes les dépendances

### `npm run build`

> Générer un build de l'API

### `npm run start`

> Lancer la version build de l'API

### `npm run dev`

> Lancer l'API en mode dév

### `npx prisma generate`

> Commande pour générer les models et les classes permettant d'intéragir avec la DB

### `npm prisma db push`

> Permet de pousser les fichiers de migration vers la DB

## Front

Les commandes pour build et lancer le front

### `npm run install`

> Installe toutes les dépendances

### `npm run build`

> Générer un build du Front

### `npm run start`

> Lance le Front en mode dév

### `npx serve -s build`

> `serve` est un outil qui permet de servir des fichiers statics, il peut être utilisé pour déployer/test le build de prod pour le front

## Docker

### `build.sh` ou `build.cmd`

> Fichier permettant de build les images API (docker-compose.api) et Front (docker-compose.front)

### `start.sh` ou `start.cmd`

> Fichier permettant de lancer le docker-compose, avec la DB (PostgreSQL), Adminer, l'API et le Front

> Ne pas oublier de changer les variables d'environnement

One line start

> `./build.sh && ./start.sh`

> `./build.cmd && ./start.cmd`

## Issues

> Lors de la connexion si la table "User" n'existe pas, il faut simplement relancer le docker-compose (via start.sh ou start.cmd)
