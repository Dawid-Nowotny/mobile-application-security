import asyncpg
from fastapi import HTTPException, status
from .schemas import ProductCreate

async def create_product(product: ProductCreate, conn: asyncpg.connection.Connection) -> dict:
    query = "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price"
    try:
        result = await conn.fetchrow(query, product.name, product.price)
        return dict(result)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating product: {str(e)}"
        )

async def get_all_products(conn: asyncpg.connection.Connection) -> list:
    query = "SELECT id, name, price FROM products"
    try:
        results = await conn.fetch(query)
        return [dict(result) for result in results]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching products: {str(e)}"
        )

async def delete_product(product_id: int, conn: asyncpg.connection.Connection) -> dict:
    query = "DELETE FROM products WHERE id = $1 RETURNING id"
    try:
        result = await conn.fetchrow(query, product_id)
        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Product not found"
            )
        return {"message": "Product deleted successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting product: {str(e)}"
        )