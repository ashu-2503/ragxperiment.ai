# app/services/vector_store_service.py
from chromadb import PersistentClient
from sentence_transformers import SentenceTransformer
from dataclasses import dataclass
from typing import Any, Dict,List


@dataclass
class RetrievedChunk:
    page_content: str
    metadata: Dict[str, Any]

# Load embedding model once
embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Persistent Chroma instance
chroma_client = PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(name="file_chunks")

def embed_and_store_chunks(file_id: int, user_id: int, chunks: list[str]):
    """
    Generate emy chunks function
    beddings for chunks and persist in ChromaDB.
    """
    if not chunks:
        return

    # Batch embed
    embeddings = embedding_model.encode(chunks, convert_to_numpy=True).tolist()
    ids = [f"{file_id}_{idx}" for idx in range(len(chunks))]
    metadata = [{"file_id": file_id, "user_id": user_id, "chunk_index": idx}
                for idx in range(len(chunks))]
    print("Saving data into chroma db!!!!!!!!!!!!!!!!!!!!!!!!")
    collection.add(documents=chunks, embeddings=embeddings, ids=ids, metadatas=metadata)

def query_chunks(query: str, top_k: int = 5) -> List[RetrievedChunk]:
    """
    Perform semantic search over ChromaDB and return top-k chunks.
    """
    # Generate embedding for query
    query_embedding = embedding_model.encode([query], convert_to_numpy=True).tolist()
    
    # Query Chroma collection
    results = collection.query(
        query_embeddings=query_embedding,
        n_results=top_k,
        include=["documents", "metadatas"]
    )

    # Handle both dict and list return formats
    if isinstance(results, dict):
        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]
    elif isinstance(results, list):
        documents = results[0] if len(results) > 0 else []
        metadatas = results[1] if len(results) > 1 else []
    else:
        raise TypeError(f"Unexpected results type from Chroma: {type(results)}")

    # Combine documents and metadatas into structured chunks
    chunks = [
        RetrievedChunk(page_content=doc, metadata=meta)
        for doc, meta in zip(documents, metadatas)
    ]

    return chunks

def get_all_chunks():
    """
    Return all documents stored in the Chroma collection.
    """
    results = collection.get(include=["documents", "metadatas"])
    
    # Add ID manually if you want
    for m in results["metadatas"]:
        m["id"] = f"{m['file_id']}_{m['chunk_index']}"
    
    return results


def show_chunks():
    results = collection.get(include=["documents", "metadatas"])
    for meta, doc in zip(results["metadatas"], results["documents"]):
        print(meta, doc[:100]) 