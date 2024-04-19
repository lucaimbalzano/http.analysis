from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from route.book import bookRouter

app = FastAPI()
app.include_router(bookRouter)

app.add_middleware(CORSMiddleware,
                   allow_methods=["*"],
                   allow_credentials=True,
                   allow_headers=["*"],
                   expose_headers=["*"],
                   allow_origins=["http://localhost:5173", "http://digitiamo-frontend:5173"])

@app.get('/')
def run_check():
    return JSONResponse(content={"status": "Running!"})