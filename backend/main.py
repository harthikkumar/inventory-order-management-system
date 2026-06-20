from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from models import Product, Customer, Order, OrderItem
from routes import products, customers, orders

# Database tables create karo (agar pehle se nahi hain)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Inventory & Order Management System")

# CORS — frontend se connect hone ke liye
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # development ke liye, baad mein restrict karenge
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers include karo
app.include_router(products.router)
app.include_router(customers.router)
app.include_router(orders.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}