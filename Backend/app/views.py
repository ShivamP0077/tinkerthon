import os
from .models import Product, Sell
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
import json
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np
from datetime import datetime
from joblib import load
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
import io
import base64


STATES = [
    "Maharashtra",
    "Uttar Pradesh",
    "Tamil Nadu",
    "Karnataka",
    "Gujarat",
    "Rajasthan",
    "West Bengal",
    "Andhra Pradesh",
    "Telangana",
    "Kerala",
    "Delhi",
    "Punjab",
    "Haryana",
    "Madhya Pradesh",
    "Bihar",
    "Odisha",
    "Jharkhand",
    "Chhattisgarh",
    "Assam",
    "Uttarakhand",
    "Himachal Pradesh",
    "Goa",
    "Tripura",
    "Manipur",
    "Meghalaya",
    "Nagaland",
    "Arunachal Pradesh",
    "Mizoram",
    "Sikkim",
]

LAPTOP_MODELS = [
    "Inspiron 15",
    "Vostro 14",
    "XPS 13",
    "XPS 15",
    "Latitude 14",
    "Gaming G15",
    "Precision 5570",
]

# Constants for economic factors
GNP = 23.2 * (10**11)
IMPORT_DUTIES = 6000


# views.py
@api_view(["POST"])
def add_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Product added", "id": serializer.data["id"]})
    
    print(serializer.errors)  # Debugging: Print validation errors
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


@api_view(["POST"])
def predict_demand(request):
    """
    API endpoint to predict demand for products based on various factors.

    Expected request data:
    {
        "state": "Maharashtra"  # Must be one of the valid Indian states
    }
    """
    demand={}
    prod_list=[]
    stock_list=[]
    pred_list=[]
    try:
        # Validate input state
        state = request.data.get("state")
        if not state or state not in STATES:
            return Response({"error": "Invalid or missing state parameter"})

        # Load the model
        model_path = os.path.join(os.getcwd(), "predictive.keras")
        try:
            model = tf.keras.models.load_model(model_path)
        except Exception as e:
            return Response({"error": f"Failed to load model: {str(e)}"})

        # Load the scaler
        try:
            scaler = load("scaler.joblib")
        except Exception as e:
            return Response({"error": f"Failed to load scaler: {str(e)}"})

        # Get all products
        products = Product.objects.all()
        predictions = {}

        # Create state encoding
        state_encoding = np.zeros(len(STATES))
        state_encoding[STATES.index(state)] = 1

        current_month = int(datetime.now().month)

        # Make predictions for each product
        for product in products:
            try:
                # Create product encoding
                product_encoding = np.zeros(len(LAPTOP_MODELS))
                if product.name in LAPTOP_MODELS:
                    product_encoding[LAPTOP_MODELS.index(product.name)] = 1

                # Prepare input features
                features = (
                    [current_month, float(product.price), GNP, IMPORT_DUTIES]
                    + state_encoding.tolist()
                    + product_encoding.tolist()
                )

                # Transform features
                X_input = pd.DataFrame([features])
                X_scaled = scaler.transform(X_input)

                # Make prediction
                prediction = model.predict(X_scaled)
                predictions[product.name] = float(prediction[0])
                prod_list.append(product.name)
                stock_list.append(product.stock)
                pred_list.append(predictions)

            except Exception as e:
                predictions[product.name] = {
                    "error": f"Failed to predict for {product.name}: {str(e)}"
                }
           
        
        demand["Product_name"]=prod_list
        demand["Stock"]=stock_list
        demand["demand"]=pred_list    
                
                

        return Response(demand)

    except Exception as e:
        return Response({"error": f"Prediction failed: {str(e)}"})
    

@api_view(["POST"])
def plot_data(request):
    data1 = pd.read_csv('data1.csv')
    state_data = data1[data1['State'] == request.data.get('state')]
    products = Product.objects.all()
    plot_list = []

    for product in products: 
        state_data2 = state_data[state_data['Model'] == product.name]
        
        if state_data2.empty:
            continue  # Skip this product if no data is available
        
        state_data3 = state_data2.groupby(['Year'])['Units_Sold'].sum().reset_index()

        if state_data3.empty:
            continue  # Skip if no sales data
        
        # Ensure Year is numeric
        state_data3['Year'] = pd.to_numeric(state_data3['Year'], errors='coerce')
        state_data3 = state_data3.dropna()  # Remove NaN values

        if state_data3['Year'].empty or state_data3['Units_Sold'].empty:
            continue  # Avoid plotting empty lists

       
        plt.plot(state_data3['Year'], state_data3['Units_Sold'], marker='o', label=product.name)

        plt.title(f'Yearly Units Sold for {product.name} in {request.data.get("state")}')
        plt.xlabel('Year')
        plt.ylabel('Total Units Sold')
        plt.grid(True)
        plt.legend(title='Model')

        buffer = io.BytesIO()
        plt.savefig(buffer, format='png')
        buffer.seek(0)
        plot_data = base64.b64encode(buffer.getvalue()).decode()
        plot_list.append(plot_data)
        
        plt.close()  # Close plot to prevent memory issues

    return Response({"plot_list": plot_list})
