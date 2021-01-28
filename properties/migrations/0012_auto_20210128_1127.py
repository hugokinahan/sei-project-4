# Generated by Django 3.1.5 on 2021-01-28 11:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('properties', '0011_auto_20210128_1121'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='favorited_by',
            field=models.ManyToManyField(blank=True, related_name='favorited_property', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='property',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='created_property', to='jwt_auth.user'),
            preserve_default=False,
        ),
    ]
