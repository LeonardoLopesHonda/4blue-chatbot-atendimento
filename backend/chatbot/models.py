from django.db import models


class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    senha = models.CharField(max_length=255)
    criado_em = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'usuario'
    
    def __str__(self):
        return self.nome

class Mensagem(models.Model):
    id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    mensagem = models.TextField()
    resposta = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'mensagem'