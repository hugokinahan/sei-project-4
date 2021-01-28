from datetime import datetime, timedelta

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status
from django.contrib.auth import get_user_model
# from randomuser import RandomUser
from django.conf import settings
import jwt

from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer

User = get_user_model()
# User = RandomUser()
# User = print(RandomUser.generate_users(10))

class RegisterView(APIView):
    """ Controller for post request to /auth/login """

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration Successful'}, status=status.HTTP_201_CREATED)
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
    """ Controller for post request to /auth/login """

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try: 
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")    
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail="Invalid Credentials")
        expiry_time = datetime.now() + timedelta(days=7)
        token = jwt.encode(
          {'sub': user_to_login.id, 'exp': int(expiry_time.strftime('%s'))},
          settings.SECRET_KEY, 
          algorithm='HS256'
        )
        return Response(
          {'token': token, 'message': f"Welcome back {user_to_login.username}"}
        )

class ProfileDetailView(APIView):
  
    permission_classes = (IsAuthenticated, )

    def get_user(self, pk):
  
        """ retrives user from db by its pk(id) or responds 404 not found """

        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound()

    def get(self, _request, pk):
        user = self.get_user(pk=pk)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

class ProfileListView(APIView):
  
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        users = User.objects.all() #querying property from index
        serialized_users = PopulatedUserSerializer(users, many=True) #expect a list
        return Response(serialized_users.data, status=status.HTTP_200_OK)
class UserFollowView(ProfileDetailView):
  
    permission_classes = (IsAuthenticated, )

    def post(self, request, pk):
        user_to_follow = self.get_user(pk=pk)
        user_to_follow.followed_by.add(request.user.id)
        user_to_follow.save()
        serialized_followed_user = PopulatedUserSerializer(user_to_follow)
        return Response(serialized_followed_user.data, status=status.HTTP_201_CREATED)

    permission_classes = (IsAuthenticated, )

    def delete(self, request, pk):
        user_to_unfollow = self.get_user(pk=pk)
        user_to_unfollow.followed_by.remove(request.user.id)
        user_to_unfollow.save()
        serialized_unfollowed_user = PopulatedUserSerializer(user_to_unfollow)
        return Response(serialized_unfollowed_user.data, status=status.HTTP_204_NO_CONTENT)
        