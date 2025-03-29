# 🎟️ API Utilisateur - Justicket

Ce microservice gère les utilisateurs dans une architecture à base de microservices RabbitMQ.

## 🚀 Lancer le projet

### Pré-requis

- Docker et Docker Compose
- Node.js >= 18 (optionnel si vous utilisez Docker)

### Commandes

```bash
# Lancer en développement
make start

# Générer le client Prisma
make generate

# Seed de la base
make seed

# Exécuter les tests
make test

# Lancer en production
docker-compose up --build
```

## 📦 Endpoints API

### 🔐 Authentification

| Méthode | Endpoint                   | Description                   |
| ------- | -------------------------- | ----------------------------- |
| POST    | `/api/auth/signup`         | Créer un compte utilisateur   |
| POST    | `/api/auth/signin`         | Se connecter                  |
| GET     | `/api/auth/profile`        | Obtenir le profil connecté    |
| POST    | `/api/auth/google`         | Connexion avec Google OAuth   |
| POST    | `/api/auth/request-reset`  | Demander une réinitialisation |
| POST    | `/api/auth/reset-password` | Réinitialiser le mot de passe |

### 👤 Utilisateurs (Admin uniquement)

| Méthode | Endpoint              | Description                       |
| ------- | --------------------- | --------------------------------- |
| GET     | `/api/users`          | Récupérer tous les utilisateurs   |
| GET     | `/api/users/:id`      | Récupérer un utilisateur          |
| PATCH   | `/api/users/:id/role` | Modifier le rôle d’un utilisateur |
| DELETE  | `/api/users/:id`      | Supprimer un utilisateur          |

## 🧪 Tests

- 8 tests unitaires et d'intégration sont disponibles
- Utilisation de Jest

## 🐇 RabbitMQ - Communication interservices

Ce service interagit via RabbitMQ :

| File d’attente | Type     | Description                      |
| -------------- | -------- | -------------------------------- |
| `jwt_decode`   | Consumer | Vérifie un JWT reçu              |
| `verify_user`  | Consumer | Vérifie si un utilisateur existe |

```
📦 user-service
└── src
    └── events
        ├── rabbitmq.ts        # Connexion RabbitMQ
        ├── queues.ts          # Noms des files
        ├── utils.ts           # Outils comme generateUuid
        ├── producers/
        │   └── publishEvent.ts
        └── consumers/
            ├── jwtConsumer.ts
            └── verifyUserConsumer.ts
```

## 🧠 Règles de gestion

| ID  | Règle                                                              |
| --- | ------------------------------------------------------------------ |
| RG1 | Chaque email doit être unique                                      |
| RG2 | Seul un administrateur peut supprimer ou modifier des utilisateurs |
| RG3 | Un token JWT est requis pour accéder aux données                   |

**Ajouts spécifiques réalisés :**

- 🔐 Réinitialisation de mot de passe via email (2 endpoints)
- 📡 Communication RabbitMQ avec réponse RPC pour `jwt_decode` et `verify_user`
- 🧪 Tests automatisés pour tous les endpoints
- 📤 Envoi d’email avec Gmail (via OAuth App Password)

## 👤 User Stories

| ID  | Story                                                                  |
| --- | ---------------------------------------------------------------------- |
| US1 | En tant qu’utilisateur, je peux créer un compte                        |
| US2 | En tant qu’utilisateur, je peux me connecter                           |
| US3 | En tant qu’admin, je peux voir, modifier ou supprimer des utilisateurs |
| US4 | En tant qu’utilisateur, je peux réinitialiser mon mot de passe         |

## 🔗 Swagger

La documentation Swagger est disponible dans `swagger.yaml`.
