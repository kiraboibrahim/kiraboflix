# Generated by Django 2.2.5 on 2021-05-08 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='upload_timestamp',
            field=models.FloatField(default=1620464281.0510414),
        ),
    ]