# Generated by Django 5.1.2 on 2024-10-29 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0002_alter_ticket_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='status',
            field=models.CharField(choices=[('OPEN', 'Open'), ('RESOLVED', 'Resolved')], default='OPEN', help_text='Status of the ticket.', max_length=10),
        ),
    ]