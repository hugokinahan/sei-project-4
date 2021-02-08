# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #4: Sharebnb 

# Brief
Create a full stack application using a Python Django REST Framework Backend to serve data from a Postgres Database and a React Frontend. Time period: 1 week. Pair project.

# Deployment
Please follow the link to the website: https://share-bnb.herokuapp.com/

# Motivation
As a pair we decided on a house swap website, where users would register their own property to search for another property to swap with. 

Our end product was Sharebnb, a clean, upmarket house swap website with social fucntionality and interconnectivity. All user data was created at random using external websites while property seed data was created by us. 

# Features

# Screenshots

![Sharebnb hompage](/desktop/sharebnb-homepage.png)

# Frameworks used

- HTML5
- SCSS
  - SemanticUI
- Python
  - Django
- JavaScript
  -  ECMAScript6
  - React.js
- mySQL
  - PostgreSQL
- GitHub
- Insomnia

# Challenges

This was my first project using a Python Django backend, so I faced a lot of challenges throughout my time working on the backend. 

The most challenging element when implementing the backend was understanding the relationships (one to many or many to many) and how to create these relationships within serializers. 

For example, we had many relationships to handle at once, especially those related to the user. Below you can see our PopulatedUserSerializer which containers 5 different relationships embedded. 

```
class PopulatedUserSerializer(UserSerializer):

    created_property = PopulatedPropertySerializer(many=True)
    posted_reviews = ReviewSerializer(many=True)
    favorited_property = PropertySerializer(many=True)
    followed_user = UserSerializer(many=True)  
    posted_offers = PopulatedOfferSerializer(many=True)
```

The challenging element of this was staying on top of these relationships as we added extra features like favouriting properties and following other users. Understanding where they needed to be used was key to the fluidity of the application. 

# Wins


  
# Future Features
If we had more time to complete this project we would have included:

- Dedicated more time to styling
- Mobile Optimisation
- Implemented notifications functionality 


