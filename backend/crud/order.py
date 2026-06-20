from sqlalchemy.orm import Session
from models.order import Order
from models.order_item import OrderItem
from models.product import Product
from schemas.order import OrderCreate


def get_all_orders(db: Session):
    return db.query(Order).all()


def get_order_by_id(db: Session, order_id: int):
    return db.query(Order).filter(Order.id == order_id).first()


def check_stock_availability(db: Session, items):
    """
    Har item ke liye check karta hai ki stock available hai ya nahi.
    Agar kisi bhi product ka stock kam hai, error message return karta hai.
    Sab theek hai toh None return karta hai.
    """
    for item in items:
        product = db.query(Product).filter(Product.id == item.product_id).first()

        if product is None:
            return f"Product with id {item.product_id} not found"

        if product.quantity < item.quantity:
            return f"Insufficient stock for product '{product.name}'. Available: {product.quantity}, Requested: {item.quantity}"

    return None  # sab sahi hai


def calculate_order_total(db: Session, items):
    """
    Database se actual price uthata hai (frontend pe bharosa nahi karte)
    aur total calculate karta hai.
    """
    total = 0.0
    for item in items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        total += product.price * item.quantity
    return total


def deduct_stock(db: Session, items):
    """
    Order confirm hone ke baad har product ka stock kam karta hai.
    """
    for item in items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        product.quantity -= item.quantity


def create_order(db: Session, order_data: OrderCreate):
    # Step 1: Stock check karo
    error = check_stock_availability(db, order_data.items)
    if error:
        return {"error": error}

    # Step 2: Total calculate karo
    total = calculate_order_total(db, order_data.items)

    # Step 3: Order banao
    new_order = Order(
        customer_id=order_data.customer_id,
        total_amount=total,
        status="confirmed"
    )
    db.add(new_order)
    db.flush()  # order.id generate karne ke liye, commit se pehle

    # Step 4: Order items banao
    for item in order_data.items:
        product = db.query(Product).filter(Product.id == item.product_id).first()
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=product.price
        )
        db.add(order_item)

    # Step 5: Stock kam karo
    deduct_stock(db, order_data.items)

    # Step 6: Sab kuch ek saath save karo
    db.commit()
    db.refresh(new_order)
    return {"order": new_order}


def delete_order(db: Session, order_id: int):
    order = get_order_by_id(db, order_id)
    if not order:
        return None

    db.delete(order)
    db.commit()
    return order