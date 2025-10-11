from huggingface_hub import hf_hub_download
from app.core.config import settings
import os

# Ensure the models folder exists
os.makedirs("app/models", exist_ok=True)

# Make sure the repo_id is set correctly
model_repo = "TheBloke/Llama-2-7B-Chat-GGUF"
filename = "llama-2-7b-chat.Q4_K_M.gguf"

if not model_repo:
    raise ValueError("Hugging Face repo_id is missing! Set it in settings.HUGGINGFACE_MODEL_REPO")

# Download the model
model_path = hf_hub_download(
    repo_id=model_repo,
    filename=filename,
    cache_dir="app/models",
    use_auth_token=settings.HUGGINGFACE_API_TOKEN  # your HF token
)

print("Downloaded model path:", model_path)
