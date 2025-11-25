from django.core.management.base import BaseCommand
from chatbot.models import Usuario


class Command(BaseCommand):
    """ Cria usuarios: Usuario A and Usuario B """

    def handle(self, *args, **options):
        # Limpa o banco de dados
        Usuario.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Database cleared.'))

        # Cria Usuario A
        usuario_a = Usuario.objects.create(
            nome='Usuario A',
            senha='a123'
        )
        self.stdout.write(self.style.SUCCESS(f'Created: {usuario_a.nome}'))

        # Cria Usuario B
        usuario_b = Usuario.objects.create(
            nome='Usuario B',
            senha='b123'
        )
        self.stdout.write(self.style.SUCCESS(f'Created: {usuario_b.nome}'))

        self.stdout.write(self.style.SUCCESS('\nTest users created!'))

