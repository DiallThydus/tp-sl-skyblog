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

> Lancer la version build de l'API

### `npm run dev`

> Lancer l'API en mode dév

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

## Routing

### Routes User

### `/user/`

> (GET) Renvoi sur la page d'accueil les informations filtrés de l'utilisateur si il est authentifié.

### `/user/signup`

> (POST) Récupère le formulaire d'inscription et enregistre le nouvel utilisteur en BDD

### `/user/signin`

> (POST) Récupère le formulaire de connexion et authentifie l'utilisateur en enregistrant le token dans un cookie et en BDD

### `/user/logout`

> (GET) Déconnecte l'utilisateur après avoir supprimé son token en BDD et dans le cookie

### `/user/switchRole`

> (GET) Permet au prof de changer de role pour tester notre super skyblog :)

### Routes Posts

### `/posts/`

> (GET) Renvoi l'ensemble des posts crées dans l'ordre de création (du plus récent au plus ancien)

### `/posts/:postId`

> (GET) Renvoi un post identifié par un Id

> (PUT) Récupère le formulaire d'édition et modifie le post identifié par un Id en BDD (accessible par l'auteur uniquement)

> (DELETE) Supprime le post identifié par un Id (accessible par l'auteur et Admin)

### `/posts/create`

> (POST) Récupère le formulaire de création de post et ajoute une entrée en BDD

### Routes Comments

### `/comments/:postId`

>(PUT) Récupère le formulaire d'édition et modifie le comment identifié par un Id en BDD (accessible par l'auteur et Admin)

> (DELETE) Supprime le comment identifié par un Id (accessible par l'auteur uniquement)

### `/comments/create`

> (POST) Récupère le formulaire de création de comment et ajoute une entrée en BDD

### Routes Admin (Role Admin uniquement)

### `/admin/usersList`

> Renvoi la liste des utilisateurs complètes

### `/admin/:userId`

> Supprime l'utilisateur identifié par un Id de la BDD
=======
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

