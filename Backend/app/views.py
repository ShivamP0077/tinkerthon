from .models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
import json
import tensorflow as tf


# views.py
@api_view(["POST"])
def add_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Product added", "id": serializer.data["id"]})
    return Response(serializer.errors, status=400)


@api_view(["GET"])
def get_all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def change_stock(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Stock updated"})
        return Response(serializer.errors, status=400)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)


@api_view(["POST"])
def increment_stock(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        product.stock += 1
        product.save()
        return Response({"message": "Stock incremented"})
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)


@api_view(["POST"])
def decrement_stock(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        if product.stock > 0:
            product.stock -= 1
            product.save()
            return Response({"message": "Stock decremented"})
        return Response({"error": "Stock cannot be negative"}, status=400)
    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)

@api_view(["POST"])
def predict_demand(request):
    model=tf.keras.load_model("predictive.keras")
