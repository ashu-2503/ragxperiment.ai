import os
from pathlib import Path
from typing import Optional

from llama_cpp import Llama
from huggingface_hub import hf_hub_download
from app.core.config import settings

# Constants
MODELS_DIR = Path("app/models")
MODELS_DIR.mkdir(parents=True, exist_ok=True)

DEFAULT_REPO_ID = "TheBloke/Llama-2-7B-Chat-GGUF"
DEFAULT_MODEL_FILE = "llama-2-7b-chat.Q4_K_M.gguf"


def get_env_var(name: str, default: Optional[str] = None) -> str:
    """
    Fetch environment variable with fallback.
    """
    value = os.getenv(name) or default
    if not value:
        raise ValueError(f"Environment variable '{name}' is not set and no default provided.")
    return value


def download_model() -> Path:
    """
    Lazy-download the Hugging Face model to local cache.
    """
    repo_id = get_env_var("HUGGINGFACE_MODEL_REPO", DEFAULT_REPO_ID)
    model_file = get_env_var("HUGGINGFACE_MODEL_FILE", DEFAULT_MODEL_FILE)
    hf_token = get_env_var("HUGGINGFACEHUB_API_TOKEN", settings.huggingface_api_token)

    model_path = MODELS_DIR / model_file
    if not model_path.exists():
        print(f"Downloading model '{repo_id}/{model_file}' ...")
        model_path_downloaded = hf_hub_download(
            repo_id=repo_id,
            filename=model_file,
            cache_dir=str(MODELS_DIR),
            token=hf_token,
        )
        print(f"✅ Model downloaded to {model_path_downloaded}")
        return Path(model_path_downloaded)

    print(f"Using cached model at {model_path}")
    return model_path


# Lazy load the model: no download on import
_model_path: Optional[Path] = None
_llama_model: Optional[Llama] = None


def get_llama_model() -> Llama:
    """
    Initialize LLaMA model if not already done.
    Returns the singleton model instance.
    """
    global _model_path, _llama_model

    if _llama_model is None:
        _model_path = download_model()
        try:
            _llama_model = Llama(
                model_path=str(_model_path),
                n_ctx=settings.llama_n_ctx,
                n_threads=settings.llama_threads,
            )
            print("✅ LLaMA model loaded successfully!")
        except Exception as e:
            print(f"Failed to initialize LLaMA model: {e}")
            raise

    return _llama_model


def generate_answer(prompt: str, max_tokens: int = 512) -> str:
    """
    Generate an answer from the LLaMA model given a prompt.
    """
    print("✅ Wait Am genreting answer for you !!")
    model = get_llama_model()
    response = model(prompt, max_tokens=max_tokens)
    return response["choices"][0]["text"]
