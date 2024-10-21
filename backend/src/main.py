from fastapi import FastAPI

app = FastAPI()

origins = [
    "http://127.0.0.1:8081"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
)