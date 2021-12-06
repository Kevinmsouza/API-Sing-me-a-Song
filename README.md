# **API - Sing me a song**


## **About the project**

Sing me a song is an API for anonymous song recommendation. The more people like a recommendation, the more likely it is to be recommended to others.

### **Routes**

- #### `GET /recommendations/random`
Response is a random song recommendation. Response example:
```json
[
  {
    "id": 8,
    "name": "Bag Raiders - Not Over",
    "youtubeLink": "https://www.youtube.com/watch?v=xX3K2qSz6ew",
    "score": 27
  }
]
```

- #### `GET /recommendations/top/:amount`
Response is the top *amount* recommendations. Response example for amount = 2:
```json
[
  {
    "id": 8,
    "name": "Bag Raiders - Not Over",
    "youtubeLink": "https://www.youtube.com/watch?v=xX3K2qSz6ew",
    "score": 27
  },
  {
    "id": 9,
    "name": "Bag Raiders - Not Over",
    "youtubeLink": "https://www.youtube.com/watch?v=xX3K2qSz6ew",
    "score": 20
  }
]
```

- #### `POST /recommendations`
**Requires a body** like: 
```json
{
    "name": "Bag Raiders - Not Over",
    "youtubeLink": "https://www.youtube.com/watch?v=xX3K2qSz6ew"
}
```

Response is the data of the posted body. Response example:
```json
{
    "id": 18,
    "name": "Bag Raiders - Not Over",
    "youtubeLink": "https://www.youtube.com/watch?v=xX3K2qSz6ew",
    "score": 0
}
```

- #### `POST /recommendations/:id/upvote`
Increases the score of recommendation by 1. <br>
Response is the data of the upvoted recommendation. Response example for id = 18:
```json
{
    "id": 18,
    "name": "Bag Raiders - Not Over",
    "youtubeLink": "https://www.youtube.com/watch?v=xX3K2qSz6ew",
    "score": 1
}
```

- #### `POST /recommendations/:id/downvote`
Decreases the score of recommendation by 1. If a recommendation gets below -5 score, it is deleted from the DB <br>
Response is the data of the downvoted recommendation (for deleted ones is a empty object). Response example for id = 18:
```json
{
    "id": 18,
    "name": "Bag Raiders - Not Over",
    "youtubeLink": "https://www.youtube.com/watch?v=xX3K2qSz6ew",
    "score": 0
}
```

### **Built with**

- [Node JS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

 <br />

## **Getting Started**

### **Prerequisites**

- npm

<br />

### **Installation**

1.  Clone this repository

```sh
https://github.com/Kevinmsouza/API-Sing-me-a-Song.git
```

2. Install the dependencies executing command

```sh
npm i
```

3. Create a .env file in folder (root) with following variables ( example values )

```sh
DB_USER=postgres
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=singmeasong
PORT=4000
```

4. Create a postgres database and fill .env with database credentials

   <br />

5. Run command inside the database

```sql
CREATE TABLE "songs" (
	"id" SERIAL NOT NULL,
	"name" TEXT NOT NULL,
	"youtube_link" TEXT NOT NULL,
	"score" INTEGER NOT NULL,
	CONSTRAINT "songs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
```
   <br />
   <br />

### **How to run**

1. Start the API

```sh
npm run start
```

