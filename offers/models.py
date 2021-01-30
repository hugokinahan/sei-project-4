from django.db import models
# from django.core.validators import MinValueValidator, MaxValueValidator

class Offer(models.Model):
    text = models.TextField(max_length=300)
    start_date = models.TextField(max_length=300)
    end_date = models.TextField(max_length=300)
    is_accepted = models.BooleanField(default=False)
    requested_property = models.ForeignKey(
        "properties.Property",
        related_name="offers",
        on_delete=models.CASCADE
    )
    offered_property = models.ForeignKey(
        "properties.Property",
        related_name="offered_property",
        on_delete=models.CASCADE
    )
    # owner = models.ForeignKey(
    #     "jwt_auth.User",
    #     related_name="posted_offers",
    #     on_delete=models.CASCADE
    # )

    def __str__(self):
        return f"Offer- {self.id} on Property - {self.requested_property} -in return for {self.offered_property}"