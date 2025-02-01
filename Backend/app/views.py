from .models import Product, Sell
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
import json


# views.py
@api_view(["POST"])
def add_product(request):
    serializer = ProductSerializer(data=request.data)
    print("jsdfhjadsh")
    if serializer.is_valid():
        print(request.data)
        serializer.save()
        print("bye")
        return Response({"message": "Product added", "id": serializer.data["id"]})
    print("hhd")
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
def Update(request):
    product = Product.objects.get(id=request.data.get("productId"))
    product.stock = request.data.get("stock")
    product.save()
    return Response({"message": "Store product Updates"})


@api_view(["POST"])
def Sell1(request):
    product = request.data.get("productId")
    quantity = request.data.get("quantity")
    print(
        request.data.get("productId"),
    )
    product = Product.objects.get(id=product)
    location = request.data.get("location")
    print(product)
    sell = Sell(product=product, state=location, quantity=quantity)
    sell.save()
    if product.stock < request.data.get("quantity"):
        return Response(
            {
                "message": "The current stock in the inventory is less then the quantity you want to deduct"
            }
        )
    product.stock -= request.data.get("quantity")
    product.save()
    return Response({"message": "done"})
