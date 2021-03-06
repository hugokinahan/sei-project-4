# Generated by Django 3.1.5 on 2021-01-27 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0006_auto_20210127_0950'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='bathrooms',
            field=models.PositiveIntegerField(default=3),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='property',
            name='bedrooms',
            field=models.PositiveIntegerField(default=5),
            preserve_default=False,
        ),
    ]
