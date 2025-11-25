"""
API views for authentication and chatbot functionality.
"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import Usuario, Mensagem
import json


@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    try:
        data = json.loads(request.body)
        nome = data.get('nome', '').strip()
        senha = data.get('senha', '').strip()
        
        if not nome or not senha:
            return JsonResponse({'error': 'nome and senha are required'}, status=400)
        
        try:
            usuario = Usuario.objects.get(nome=nome)
            if usuario.senha == senha:
                request.session['usuario_id'] = usuario.id
                request.session['usuario_nome'] = usuario.nome
                return JsonResponse({
                    'success': True,
                    'nome': usuario.nome,
                    'message': 'Login successful'
                })
            else:
                return JsonResponse({'error': 'Invalid nome or senha'}, status=401)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Invalid nome or senha'}, status=401)
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
def logout(request):
    try:
        if 'usuario_id' in request.session:
            del request.session['usuario_id']
            del request.session['usuario_nome']
        return JsonResponse({'success': True, 'message': 'Logout successful'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@require_http_methods(["GET"])
def check_auth(request):
    if 'usuario_id' in request.session:
        return JsonResponse({
            'authenticated': True,
            'nome': request.session.get('usuario_nome')
        })
    else:
        return JsonResponse({'authenticated': False})


@csrf_exempt
@require_http_methods(["POST"])
def chat(request):
    """
        Salva a conversa no banco de dados e retorna a resposta do chatbot.
    """
    if 'usuario_id' not in request.session:
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return JsonResponse({'error': 'Message is required'}, status=400)
        
        usuario_id = request.session['usuario_id']
        usuario = Usuario.objects.get(id=usuario_id)
        
        bot_response = f"Olá {usuario.nome}! Obrigado por entrar em contato, te retornaremos em breve."
        Mensagem.objects.create(usuario=usuario, mensagem=user_message, resposta=bot_response)

        return JsonResponse({
            'response': bot_response,
            'usuario': usuario.nome
        })
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Usuario not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@require_http_methods(["GET"])
def get_conversation(request):
    if 'usuario_id' not in request.session:
        return JsonResponse({'error': 'Authentication required'}, status=401)
    
    try:
        usuario_id = request.session['usuario_id']
        usuario = Usuario.objects.get(id=usuario_id)

        mensagens = Mensagem.objects.filter(usuario=usuario)

        conversation = []
        for msg in mensagens:
            conversation.append({
                'role': 'user',
                'message': msg.mensagem
            })
            conversation.append({
                'role': 'bot',
                'message': msg.resposta
            })

        return JsonResponse({'conversation': conversation})
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Usuario not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)