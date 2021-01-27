from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Review(models.Model):
    text = models.TextField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(validators=[MinValueValidator(1),
                                       MaxValueValidator(5)])
    property = models.ForeignKey(
        "properties.Property",
        related_name="reviews",
        on_delete=models.CASCADE
    )
    # owner = models.ForeignKey(
    #     "jwt_auth.User",
    #     related_name="posted_comments",
    #     on_delete=models.CASCADE
    # )

    def __str__(self):
        return f"Review - {self.id} on Property - {self.property}"