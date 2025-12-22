# test_chroma/reset_chroma.py
from app.services.vector_store_service import collection

def reset_chroma():
    print("Deleting all data from ChromaDB collection...")
    
# Fetch all IDs and delete them manually
    all_data = collection.get()
    if all_data and "ids" in all_data and all_data["ids"]:
        collection.delete(ids=all_data["ids"])
        print(f"Deleted {len(all_data['ids'])} records.")
    else:
        print("No records found — collection already empty.")
    
    print("ChromaDB reset complete!")

if __name__ == "__main__":
    reset_chroma()
