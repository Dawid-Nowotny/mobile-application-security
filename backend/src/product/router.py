from fastapi import APIRouter, Depends, status
from typing import List

from .schemas import ProductCreate, ProductResponse
from .service import create_product, get_all_products, delete_product
from database import get_db_connection

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=ProductResponse)
async def add_product(product: ProductCreate, conn=Depends(get_db_connection)):
    return await create_product(product, conn)

@router.get("/", status_code=status.HTTP_200_OK, response_model=List[ProductResponse])
async def list_products(conn=Depends(get_db_connection)):
    return await get_all_products(conn)

@router.delete("/{product_id}", status_code=status.HTTP_200_OK)
async def remove_product(product_id: int, conn=Depends(get_db_connection)):
    return await delete_product(product_id, conn)