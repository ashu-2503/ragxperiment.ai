from app.services.llm_service import generate_answer
from app.services.vector_store_service import query_chunks

# def query_rag(user_query: str):
#     # Retrieve top chunks
#     chunks = query_chunks(user_query, top_k=3)
#     context_text = "\n".join([c.page_content for c in chunks])
    
#     # Feed to LLaMA
#     prompt = f"Answer using only the context below:\n{context_text}\n\nQuestion: {user_query}"
#     answer = generate_answer(prompt)
#     return {"answer": answer, "sources": [c.metadata for c in chunks]}

def query_rag(user_query: str):
    # Retrieve top chunks
    chunks = query_chunks(user_query, top_k=3)
    
    # Build context text safely
    context_text = "\n".join([c.page_content for c in chunks])
    
    # Feed to LLaMA
    prompt = f"Answer using only the context below:\n{context_text}\n\nQuestion: {user_query}"
    answer = generate_answer(prompt)
    
    return {"answer": answer, "sources": [c.metadata for c in chunks]}
