# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #4: Sharebnb 

# Brief
Create a full stack application using a Python Django REST Framework Backend to serve data from a Postgres Database and a React Frontend. Time period: 1 week. Pair project.

# Members

- Elsie Down - https://github.com/elsiedown
- Hugo Kinahan - https://github.com/hugokinahan

# Deployment

Please follow the link to the website: https://share-bnb.herokuapp.com/

Repository link: https://github.com/hugokinahan/sei-project-4

# Motivation
As a pair we decided on a house swap website, where users would register their own property to search for another property to swap with. 

Our end product was Sharebnb, a clean, upmarket house swap website with social fucntionality and interconnectivity. All user data was created at random using external websites while property seed data was created by us. 

# Preparation & Organisation

ERD Diagram

![ERD Diagram](ERD-diargram.png)

Wireframe

![Wireframe](wireframe-p4.png)

Trello

![Trello](Trello-p4.png)

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

# Process

Having learnt from a past pair project, we spent a good amount of time planning our application, establishing what relationships would be needed, the user journey and how our ideals for the 'look and feel' of the website. We established our relationships on an ERD Diagram you can see above and gauged a rough user journey. 

After only one week of Python and Django tuition under our belt, we decided to set ourselves a challenging project. We planned for complex functionality, including social aspects of following, favouriting and requesting properties. 

With a Python Django backend being a relatively new concept to us, we decided to go through the backend together, with one person screen-sharing. This ensured that we both understood, in detail, the backend relationships and framework. 

We started by creating our models for our properties, users, property_types, reviews and offers. Once we had them all completed we could then establish the relationships through foreign keys. Below is an example of our properties model.

```
class Property(models.Model):
    name = models.CharField(max_length=50, unique=True)
    address = models.CharField(max_length=60)
    city = models.CharField(max_length=30)
    country = models.CharField(max_length=30)
    continent = models.CharField(max_length=30)
    description = models.CharField(max_length=600)
    property_image = models.CharField(max_length=500)
    is_available = models.BooleanField(default=False)
    longitude = models.DecimalField(max_digits=30, decimal_places=20)
    latitude = models.DecimalField(max_digits=30, decimal_places=20)
    bathrooms = models.PositiveIntegerField()
    bedrooms = models.PositiveIntegerField()
    types = models.ManyToManyField('property_types.PropertyType', related_name="properties")
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='created_property',
        on_delete=models.CASCADE
    )
    favorited_by = models.ManyToManyField(
        'jwt_auth.User',
        related_name="favorited_property",
        blank=True
    )
  
    def __str__(self):
        return f"{self.name} - {self.city}"
```

We then carefully worked through the serializers to ensure they were all correct and populated with the correct relationships before moving onto authentication to restrict certain permissions if you were not a logged in user. For example, below is a code snippet showing how we were able to show all properties and how a new property could be created with permission_classes in place.

```
class PropertyListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        properties = Property.objects.all() #querying property from index
        serialized_property = PopulatedPropertySerializer(properties, many=True) #expect a list
        return Response(serialized_property.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        property_to_create = PropertySerializer(data=request.data)
        if property_to_create.is_valid():
            property_to_create.save()
            return Response(property_to_create.data, status=status.HTTP_201_CREATED)
        return Response(property_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```

After 3 days and once all of the backend was tested, with our seeded data in place, we moved onto the React frontend. Using Trello we were able to delegate different tasks and stay on top of our project. I took on responsibility for the homepage and the property show page which you can see below in the screen shots. 

We wanted a slick and clean design that represented a community of users. To show this on the homepage I decided to pull the profile picture of our created users (code below) to ensure that a commnuity feel was present. This, as well as a react-hero-carousel on the homepage, ensure that any new user could quickly gauge the purpose and feel of the application. 

```
        <div className="users-index">
          {properties ? properties.slice(1, 50).map(property => (
            <div key={property.id}>
              <img src={property.owner.profile_image} />
            </div>
          ))
            :
            ''
          }
        </div>
```

The property show page was a little more difficult, as we had a lot of information and functionality to fit into one page. After the property information and user information was presented on the page I began with the review section. Here I wanted any logged in user to be able to leave a review. Using SemanticUI I was able to choose a clean design. 

As there was already a lot of information on the one page, I researched on how to implement popup modals. I used reactjs-popup to create a 'request a swap' form and a 'leave a review' form, meaning the user would not have to leave the current page. 

Once I was happy with the show page we combined to discuss what we wanted a logged in user to see versus a browsing user and made some subtle changes. Such as the homepage buttons changing from 'sign up' and 'login' when browsing to 'explore' and 'add property' when logged in. 

```
{isLoggedIn ?
              <div className="homepage-buttons">
                <Button as={Link} to={'/properties/'} className="login-button" type='submit' style={{ borderRadius: 0, border: '1px solid #012349', width: '100%' }}>Explore</Button>
                <Button as={Link} to={'/register/property/'} className="login-button" type='submit' style={{ borderRadius: 0, border: '1px solid #012349', width: '100%' }}>Add Property</Button>
              </div>
              :
              <div className="homepage-buttons">
                <Button as={Link} to={'/register/'} className="sign-up-button" type='submit' style={{ borderRadius: 0, border: '1px solid #012349', width: '100%' }}>Sign Up</Button>
                <Button as={Link} to={'/login/'} className="login-button" type='submit' style={{ borderRadius: 0, border: '1px solid #012349', width: '100%' }}>Login</Button>
```

All that was left was to go through in detail the styling of application. Luckily we had a very similar view of what we wanted the website to look like, so we were able to get through this process quickly, and move onto testing our site in full. 

# Screenshots

Homepage

![Homepage](sharebnb-homepage.png)

Index Page

![Index Page](sharebnb-indexpage.png)

Show Page

![Show Page](sharebnb-showpage.png)

Show Page

![Show Page](sharebnb-showpage-map.png)

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

Throughout our project we worked hard to give the website a clean and 'upmarket' finish. One aspect of this was maintaining a fluid user journey throughout their navigation of the site. 

To stop users from having to change pages to often I implemented popup modals from React.js-popup. This meant that the user could stay on the same page when making requests. These requests included leavving a review and a rating as well as making a request for a house swap. 

The below code snippet shows how we implemented these popup modals (some code from the form has been ommitted to save space) and the screenshot shows this popup modal in action.



```
    <Popup
      trigger={<Button className="request-button" type="submit" style={{ backgroundColor: '#012349', borderRadius: 0, color: 'white' }}>
        Request A Swap <Icon name="exchange" className="exchange-icon"/>
      </Button>}
      modal
      nested
    >
      {close => (
        <div className={!isSent ?  'modal' : 'sent-modal'}>
          <button className="close" onClick={close}>
          &times;
          </button>
          <div className="header"> 
            {property.owner ?  
              <div>
                <p>Request a swap with {property.owner.first_name} </p>
                <p>{property.address}</p>
                <p>{property.city}, {property.country}</p>
              </div>
              : '' }
          </div>
          <div className="content">
            {!isSent ?
              <Form inverted onSubmit={handleSubmit} className="small form">
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label fluid>First Name *</label>
                    <input placeholder='eg. John'
                      onChange={handleChange}
                      name="first_name"
                    // value={formdata.first_name}
                    />
                  </Form.Field>
          <div className="actions">
            <Button className="popup-auth-request" onClick={() => {
              console.log('modal closed ')
              close()
            }} style={{ backgroundColor: 'white', borderRadius: 0, color: '#012349', border: 'none', width: '25%' }}>Close</Button>
            
          </div>
        </div>
      )}
    </Popup>
  ```
  
   ![Popup Modal](popup-modal.png) 
   
# Key Learnings

We were both very pleased with how our website looked when it was completed. However, in hindsight we both felt that there were aspects where we could have done better had we had the chance again. 

For example, we struggled with styling due to some of the installed packages such as react-hero-carousel. Therefore, in future I would be more careful when implementing external packages. 

Otherwise, we worked extreme;ly well together and through thorough planning made a complex project run pretty smoothly on the whole with minimal disruption. 
  
# Future Features
If we had more time to complete this project we would have included:

- Dedicated more time to styling
- Mobile Optimisation
- Implemented notifications functionality 


