<b><h3>#TICKET.COM BACKEND TAKEWAY HOME TEST</h3></b>

#PREREQUISITES
<br> insomnia or postman to call the API and get the Graphql schema

#HOW TO RUN
<br/>1.npm install
<br/>2.npm run start

<br>http://localhost:3000/hotelwithoutDB?limit=2&sort=DESC&start=0
<br>http://localhost:3000/hotel?limit=2&sort=DESC&start=0
<br>query{
	hotelConnection(sort:_ROOM_ASC){
		edges{
			node{
				Name
				AvailableRoom
			}
		}
		pageInfo{
			endCursor
			hasNextPage
		}
	}
}

#HOW TO RUN TEST CEST
<br/>1.npm run test

#DESCRIPTION
<br/> REST concist 2 endpoint hotelConnection and hotelWithOutDB , the difference between those endpoint are 
<br/> hotelConenciton using MongoDb and hotelWithOutDB using Object as the database


