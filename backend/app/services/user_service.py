# from fastapi import HTTPException, status
# from app.repositories.user_repository import UserRepository

# class UserService:
#     def __init__(self, repo: UserRepository):
#         self.repo = repo

#     def get_all_users(self):
#         return self.repo.get_all()

#     def get_user_by_id(self, user_id: int):
#         user = self.repo.get_by_id(user_id)
#         if not user:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail=f"User with id {user_id} not found"
#             )
#         return user
    
#     def get_all_users_paginated(self, skip: int = 0, limit: int = 10):
#         users = self.repo.get_all_paginated(skip=skip, limit=limit)
#         total = self.repo.get_total_count()
#         # Build response including file paths for each user
#         users_data = [
#             {
#                 "id": user.id,
#                 "name": user.name,
#                 "email": user.email,
#                 "files": [f.file_path for f in user.files]  # file paths
#             } for user in users
#         ]
#         return {"total": total, "skip": skip, "limit": limit, "users": users_data}
