# Generated by Django 4.1.7 on 2023-04-07 19:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("properties", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Reservation",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "state",
                    models.CharField(
                        choices=[
                            ("PENDING", "Pending"),
                            ("DENIED", "Denied"),
                            ("APPROVED", "Approved"),
                            ("CANCELED", "Canceled"),
                            ("TERMINATED", "Terminated"),
                            ("COMPLETED", "Completed"),
                        ],
                        default="PENDING",
                        max_length=200,
                    ),
                ),
                ("paid", models.BooleanField(default=False)),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                (
                    "guest",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="guest_reservations",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "host",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="host_reservations",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "property",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="reservations",
                        to="properties.property",
                    ),
                ),
            ],
        ),
    ]
