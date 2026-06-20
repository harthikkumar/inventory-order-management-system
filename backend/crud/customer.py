from sqlalchemy.orm import Session
from models.customer import Customer
from schemas.customer import CustomerCreate


def get_all_customers(db: Session):
    return db.query(Customer).all()


def get_customer_by_id(db: Session, customer_id: int):
    return db.query(Customer).filter(Customer.id == customer_id).first()


def get_customer_by_email(db: Session, email: str):
    return db.query(Customer).filter(Customer.email == email).first()


def create_customer(db: Session, customer: CustomerCreate):
    # Email duplicate check
    existing = get_customer_by_email(db, customer.email)
    if existing:
        return None  # route mein handle karenge error ke liye

    new_customer = Customer(
        name=customer.name,
        email=customer.email,
        phone=customer.phone
    )
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer


def delete_customer(db: Session, customer_id: int):
    customer = get_customer_by_id(db, customer_id)
    if not customer:
        return None

    db.delete(customer)
    db.commit()
    return customer