# from flask import Blueprint, request, jsonify
# import jwt
# import datetime
# from functools import wraps
# from .models import users_db, chat_sessions, User, ChatSession

# auth_bp = Blueprint('auth', __name__)

# # JWT configuration
# JWT_SECRET = 'elimuai-secret-key-change-in-production'
# JWT_ALGORITHM = 'HS256'

# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = request.headers.get('Authorization')
        
#         if not token:
#             return jsonify({'message': 'Authentication token is missing'}), 401
            
#         try:
#             if token.startswith('Bearer '):
#                 token = token[7:]
#             data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
#             current_user = users_db.get(data['user_id'])
#             if not current_user:
#                 return jsonify({'message': 'User not found'}), 401
#         except jwt.ExpiredSignatureError:
#             return jsonify({'message': 'Token has expired'}), 401
#         except jwt.InvalidTokenError:
#             return jsonify({'message': 'Token is invalid'}), 401
            
#         return f(current_user, *args, **kwargs)
#     return decorated

# @auth_bp.route('/signup', methods=['POST'])
# def signup():
#     try:
#         data = request.get_json()
        
#         # Validate required fields
#         required_fields = ['first_name', 'last_name', 'email', 'password']
#         for field in required_fields:
#             if not data.get(field):
#                 return jsonify({'message': f'{field} is required'}), 400
        
#         # Check if user already exists
#         if any(user.email == data['email'] for user in users_db.values()):
#             return jsonify({'message': 'User with this email already exists'}), 409
        
#         # Create new user
#         user_id = f"user_{len(users_db) + 1}"
#         user = User(
#             user_id=user_id,
#             first_name=data['first_name'],
#             last_name=data['last_name'],
#             email=data['email']
#         )
        
#         # Store password (in production, use proper hashing!)
#         user.password = data['password']
#         user.newsletter_subscription = data.get('newsletter_subscription', True)
        
#         users_db[user_id] = user
        
#         # Generate JWT token
#         token = jwt.encode({
#             'user_id': user_id,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
#         }, JWT_SECRET, algorithm=JWT_ALGORITHM)
        
#         return jsonify({
#             'message': 'Account created successfully',
#             'user': user.to_dict(),
#             'token': token
#         }), 201
        
#     except Exception as e:
#         return jsonify({'message': f'Server error: {str(e)}'}), 500

# @auth_bp.route('/login', methods=['POST'])
# def login():
#     try:
#         data = request.get_json()
        
#         if not data.get('email') or not data.get('password'):
#             return jsonify({'message': 'Email and password are required'}), 400
        
#         # Find user by email
#         user = next((u for u in users_db.values() if u.email == data['email']), None)
        
#         if not user or user.password != data['password']:
#             return jsonify({'message': 'Invalid email or password'}), 401
        
#         # Update last login
#         user.last_login = datetime.datetime.utcnow()
        
#         # Generate JWT token
#         token = jwt.encode({
#             'user_id': user.id,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
#         }, JWT_SECRET, algorithm=JWT_ALGORITHM)
        
#         return jsonify({
#             'message': 'Login successful',
#             'user': user.to_dict(),
#             'token': token
#         })
        
#     except Exception as e:
#         return jsonify({'message': f'Server error: {str(e)}'}), 500

# @auth_bp.route('/social', methods=['POST'])
# def social_login():
#     try:
#         data = request.get_json()
#         provider = data.get('provider')
#         access_token = data.get('access_token')
        
#         # Mock social authentication - replace with real OAuth validation
#         user_id = f"{provider}_{hash(access_token) % 10000}"
        
#         if user_id not in users_db:
#             # Create new user from social provider
#             user = User(
#                 user_id=user_id,
#                 first_name=data.get('first_name', f"{provider.capitalize()}"),
#                 last_name=data.get('last_name', "User"),
#                 email=data.get('email', f"user_{user_id}@elimuai.com"),
#                 provider=provider
#             )
#             users_db[user_id] = user
#         else:
#             user = users_db[user_id]
        
#         # Update last login
#         user.last_login = datetime.datetime.utcnow()
        
#         # Generate JWT token
#         token = jwt.encode({
#             'user_id': user_id,
#             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
#         }, JWT_SECRET, algorithm=JWT_ALGORITHM)
        
#         return jsonify({
#             'message': 'Social login successful',
#             'user': user.to_dict(),
#             'token': token
#         })
        
#     except Exception as e:
#         return jsonify({'message': f'Server error: {str(e)}'}), 500

# @auth_bp.route('/me', methods=['GET'])
# @token_required
# def get_current_user(current_user):
#     return jsonify({
#         'user': current_user.to_dict()
#     })

# @auth_bp.route('/logout', methods=['POST'])
# @token_required
# def logout(current_user):
#     # In production, you might want to blacklist the token
#     return jsonify({'message': 'Logout successful'})

# @auth_bp.route('/profile', methods=['PUT'])
# @token_required
# def update_profile(current_user):
#     try:
#         data = request.get_json()
        
#         # Update user profile
#         if 'first_name' in data:
#             current_user.first_name = data['first_name']
#         if 'last_name' in data:
#             current_user.last_name = data['last_name']
#         if 'newsletter_subscription' in data:
#             current_user.newsletter_subscription = data['newsletter_subscription']
        
#         return jsonify({
#             'message': 'Profile updated successfully',
#             'user': current_user.to_dict()
#         })
        
#     except Exception as e:
#         return jsonify({'message': f'Server error: {str(e)}'}), 500

# # Chat sessions management
# @auth_bp.route('/sessions', methods=['GET'])
# @token_required
# def get_chat_sessions(current_user):
#     user_sessions = [session.to_dict() for session in chat_sessions.values() 
#                     if session.user_id == current_user.id]
    
#     # Sort by most recent
#     user_sessions.sort(key=lambda x: x['updated_at'], reverse=True)
    
#     return jsonify({'sessions': user_sessions})

# @auth_bp.route('/sessions', methods=['POST'])
# @token_required
# def create_chat_session(current_user):
#     try:
#         data = request.get_json()
#         session_id = f"session_{len(chat_sessions) + 1}"
        
#         session = ChatSession(
#             session_id=session_id,
#             user_id=current_user.id,
#             title=data.get('title', 'New Chat')
#         )
        
#         chat_sessions[session_id] = session
        
#         return jsonify({
#             'message': 'Chat session created successfully',
#             'session': session.to_dict()
#         }), 201
        
#     except Exception as e:
#         return jsonify({'message': f'Server error: {str(e)}'}), 500

# @auth_bp.route('/sessions/<session_id>', methods=['DELETE'])
# @token_required
# def delete_chat_session(current_user, session_id):
#     try:
#         session = chat_sessions.get(session_id)
        
#         if not session:
#             return jsonify({'message': 'Session not found'}), 404
            
#         if session.user_id != current_user.id:
#             return jsonify({'message': 'Access denied'}), 403
            
#         del chat_sessions[session_id]
        
#         return jsonify({'message': 'Chat session deleted successfully'})
        
#     except Exception as e:
#         return jsonify({'message': f'Server error: {str(e)}'}), 500