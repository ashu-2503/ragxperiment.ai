from app.services.vector_store_service import get_all_chunks, query_chunks

def show_chunks():
    data = get_all_chunks()
    print(f"Total chunks stored: {len(data['documents'])}\n")

    print("First 10 chunks:")
    for i, doc in enumerate(data['documents'][:10]):
        print(f"{i+1}: {doc[:200]}...\n")  # show first 200 chars

def ask_question():
    query = input("Ask a question about the uploaded files: ")
    res = query_chunks(query, top_k=3)
    
    print("\nTop 3 results:")
    for i, doc in enumerate(res["documents"][0]):
        print(f"Result {i+1}: {doc[:300]}...\n")  # first 300 chars

if __name__ == "__main__":
    print("=== ChromaDB & RAG Demo ===\n")
    show_chunks()
    while True:
        ask_question()
        cont = input("Do you want to ask another question? (y/n): ")
        if cont.lower() != 'y':
            break
