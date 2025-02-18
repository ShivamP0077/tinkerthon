from django.urls import path
from .views import (
    add_product,
    get_all_products,
    change_stock,
    Update,
    Sell1,
    predict_demand,
    plot_data,
)

urlpatterns = [
    path("add/", add_product, name="add_product"),
    path("all/", get_all_products, name="get_all_products"),
    path("stock/<int:product_id>/", change_stock, name="change_stock"),
    path("update-stock/", Update, name="update_stock"),
    path("sell-stock/", Sell1, name="sell_stock"),
    path("preDemand/", predict_demand, name="predict_demand"),
    path("getData/", plot_data, name="plot_data"),
]
