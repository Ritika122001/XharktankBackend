
# Objective
Build a Backend of XharkTank where budding entrepreneurs can pitch ideas for a business or product they wish to develop by providing their name, title & idea for the business, the investment amount they expect to be fulfilled, and the percentage of equity they are ready to shed away to the potential investors. 
Investors must be able to retrieve the list of all pitches and share their feedback/comments with a counter offer as per their interests.


Implement the GET/POST APIs required for the backend to function as per the requirements
## Tech Stack

**Server:** NodeJs, ExpressJs

**Database:** MongoDB 

**Tools:** Postman 


## Flow of Project
These are the mandatory product flows that are expected while building the backend for the XharkTank application

1. Entrepreneurs will post Pitch by providing these inputs
-> Name of the entrepreneur posting the pitch
-> Title of the pitch
-> Business Idea for the Product they wish to develop
-> Ask Expected Amount for investment
-> Percentage of Equity to be diluted

2. Investors will view all the latest pitches posted to date
-> If the entrepreneurs post a new pitch, that should also get listed. Note that these submitted pitches will be shown one below the other.

3. Investors will make a counteroffer to the pitch by providing these inputs
-> Unique Id of the Pitch made by the entrepreneur
-> Name of the investor making a counteroffer
-> Amount ready to invest in the idea
-> Ask Percentage of Equity for a company



## Mandatory API Requirements
The interaction between the frontend and backend shall be based on a REST API with support for the below 4 endpoints.

1. Endpoint to post a pitch to the backend
2. Endpoint to make a counter offer for a pitch to the backend
3. Endpoint to fetch the all the pitches in the reverse chronological order ( i.e. last created one first ) from the backend
4. Endpoint to specify a particular id (identifying the pitch) to fetch a single Pitch.

## Usage/Examples

```
1. Endpoint to post a pitch to the backend

curl --location --request POST 'http://<Server_URL>/pitches' \

--header 'Content-Type: application/json' \
--data-raw '{
"entrepreneur": "Ashok kumar",
"pitchTitle" : "Crio.Do - Work-experience based learning programs for developers",
"pitchIdea" : "Build professional projects like the top 1% developers. 
Master the latest full stack and backend tech with real work-ex. 
Crack developer jobs at the best tech companies.",
"askAmount": 10000000.25,
"equity" : 12.5

}

//Response

{

"id": "1"

}

```

```
2. Endpoint to make a counter offer for a pitch to the backend

curl --location --request POST 'http://<Server_URL>/pitches/1/makeOffer' \
--header 'Content-Type: application/json' \
--data-raw '{
"investor": "Anupam Mittal",
"amount" : 10000000.56,
"equity" : 20.2,
"comment": "A new concept in the ed-tech market. I can relate with the importance of the Learn By Doing philosophy. Keep up the Good Work! Definitely interested to work with you to scale the vision of the company!"

}'

//Response Body
{

"id": "1"

}

```
```

3. Endpoint to fetch the all the pitches in the reverse chronological order ( i.e. last created one first ) from the backend
curl --location --request GET 'http://<Server_URL>/pitches'
//Response Body

[
   {

      "id":"2",
      "entrepreneur":"Sanjay kumar",
      "pitchTitle":"Lenskart - Sabo Chashma Pehnao",
      "pitchIdea":"Lenskart's aim is to help drop this number marginally in the coming years, which can be achieved by providing high quality eyewear to millions of Indians at affordable prices, giving free eye check ups at home and by extending our services to the remote corners of India.",
      "askAmount":20000000.23,
      "equity":15.23,
      "offers":[
      ]

   },

   {
     "id":"1",
     "entrepreneur":"Ashok kumar",
      "pitchTitle":"Crio.Do - Work-experience based learning programs for developers",
      "pitchIdea":"Build professional projects like the top 1% developers. Master the latest full stack and backend tech with real work-ex. Crack developer jobs at the best tech companies.",
      "askAmount":10000000,
      "equity":12.5,
      "offers":[
 {

            "id":"1",

            "investor":"Anupam Mittal",

            "amount":10000000.23,

            "equity":20.23,

            "comment":"A new concept in the ed-tech market. I can relate with the importance of the Learn By Doing philosophy. Keep up the Good Work! Definitely interested to work along with you"

         }]}]


```

```
4. Endpoint to specify a particular id (identifying the pitch) to fetch a single Pitch


curl --location --request GET 'http://<Server_URL>/pitches/2'

//Respone Body

{

   "id":"2",
   "entrepreneur":"Sanjay kumar",
   "pitchTitle":"Lenskart - Sabo Chashma Pehnao",
   "pitchIdea":"Lenskart's aim is to help drop this number marginally in the coming years, which can be achieved by providing high quality eyewear to millions of Indians at affordable prices, giving free eye check ups at home and by extending our services to the remote corners of India.",
   "askAmount":20000000.23,
   "equity":15.23,
   "offers":[]

}

```


## How to run project

To deploy this project run

Clone Project

```bash
  git clone __repo_link_
```

Navigate to Project

```bash
  cd _project_directory_
```

Install Dependencies

```bash
  npm install
```

Run Project

```bash
  npm run dev
```

## Demo
https://youtu.be/VUp0Pf1p1Bg