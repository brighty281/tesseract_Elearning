# Generated by Django 5.0.6 on 2024-07-13 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0002_communitychatmessages'),
    ]

    operations = [
        migrations.AddField(
            model_name='communitychatmessages',
            name='community',
            field=models.CharField(max_length=250, null=True),
        ),
    ]