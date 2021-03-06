# Generated by Django 3.1.5 on 2021-01-27 16:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('properties', '0008_property_types'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='created_property', to='jwt_auth.user'),
            preserve_default=False,
        ),
    ]
