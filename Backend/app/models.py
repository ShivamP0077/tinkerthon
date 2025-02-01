from django.db import models
import uuid


class Product(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField()


class Sell(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    state = models.TextField()
    quantity = models.PositiveIntegerField(default=0)
