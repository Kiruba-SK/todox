# Generated by Django 5.1.5 on 2025-02-14 06:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apiApp', '0002_todo_data'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo_data',
            old_name='tirle',
            new_name='title',
        ),
    ]
