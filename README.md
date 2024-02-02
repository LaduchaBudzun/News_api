# News API

  

### How to start the app

  

- in ./News_api:

```

1. add .env file

2. sudo docker build --tag news-api:1.0 .

3. sudo docker run -p 8000:3005 --name test-news news-api:1.0

4. The application will run on localhost:8000
```


### API Documentation



## 1. Get News
```
/get-news
```
  

### Description
```
This endpoint retrieves news articles based on specified parameters such as sorting and filtering.
```
  

### Endpoint
```
GET /get-news
```
  
### Parameters

- `sort` (optional): Sorts the news articles. Possible values: `'date'` or `'title'`.

- `filter` (optional): Filters the news articles based on the title. Only alphanumeric characters and spaces are allowed.

  

### Example Usage
```
1. Get all news articles:

GET /get-news
```
  
```
2. Get news articles sorted by date in descending order:

GET /get-news?sort=date
```
  
```
3. Get news articles filtered by title:

GET /get-news?filter=example
```
  ```

4. Get news articles sorted by title in ascending order:

GET /get-news?sort=title
```
  
  

## 2. Update News by ID

  

### Description
```
This endpoint updates news articles based on the specified ID with new information such as title, description, and content.
```
  

### Endpoint
```
POST /update-news
```
  

### Request Body

- `id` (required): The ID of the news article to update.

- `title` (optional): The new title for the news article.

- `description` (optional): The new description for the news article.

- `content` (optional): The new content for the news article.

  

### Example Usage
```
1. Update news article with ID "123" with a new title:

POST /update-news

{
"id": "123",
"title": "New Title"
}
```
  

## 3. Delete News by ID

  

### Endpoint
```
DELETE /delete-news
```

### Request Body

- `id` (required): The ID of the news article to delete.

 