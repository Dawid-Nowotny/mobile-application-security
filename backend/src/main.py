import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from product import router as product_router
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

app = FastAPI()
app.add_middleware(HTTPSRedirectMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router.router, prefix='/product', tags=['product'])