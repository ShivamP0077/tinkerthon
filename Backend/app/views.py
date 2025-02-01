from .models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
import json
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np
import datetime as dt
from joblib import load


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
    now=datetime.now()
    model = tf.keras.models.load_model("predictive.keras")
    GNP=23.2 *(10**11)
    import_duties=6000
    products=Product.objects.all()
    states=['Maharashtra',
 'Uttar Pradesh',
 'Tamil Nadu',
 'Karnataka',
 'Gujarat',
 'Rajasthan',
 'West Bengal',
 'Andhra Pradesh',
 'Telangana',
 'Kerala',
 'Delhi',
 'Punjab',
 'Haryana',
 'Madhya Pradesh',
 'Bihar',
 'Odisha',
 'Jharkhand',
 'Chhattisgarh',
 'Assam',
 'Uttarakhand',
 'Himachal Pradesh',
 'Goa',
 'Tripura',
 'Manipur',
 'Meghalaya',
 'Nagaland',
 'Arunachal Pradesh',
 'Mizoram',
 'Sikkim']
    demand={}
    arr=np.zeros(29)
    arr2=np.zeros(7)
    laptop_models=['Inspiron 15', 'Vostro 14', 'XPS 13', 'XPS 15', 'Latitude 14',
       'Gaming G15', 'Precision 5570']

    for prod in products:
        prices=float(prod.price)
        prod_name=prod.name
        state=request.data.get("state")
        
        index=states.index(state)
        arr[index]=1

        index2=laptop_models(name)
        arr2[index2]=1
        
        scaler=load("scaler.joblib")
        
        
        X_input=pd.DataFame([int(now.month), int(prices), GNP, import_duties]+ arr.tolist()+ arr2.tolist())
        X_input=scaler.transform(X_input)

        output=model.predict(X_input)
        
        
    
    
    
    
