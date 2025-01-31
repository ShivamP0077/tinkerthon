from django.urls import path
from .views import (
    add_product,
    get_all_products,
    change_stock,
    increment_stock,
    decrement_stock,
)

urlpatterns = [
    path("add/", add_product, name="add_product"),
    path("all/", get_all_products, name="get_all_products"),
    path("stock/<int:product_id>/", change_stock, name="change_stock"),
    path("stock/increment/<int:product_id>/", increment_stock, name="increment_stock"),
    path("stock/decrement/<int:product_id>/", decrement_stock, name="decrement_stock"),
]
