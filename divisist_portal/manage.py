#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from django.core.management.base import CommandError

def main():
    """Run administrative tasks."""
    try:
        # Configuración del módulo de settings
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ProyectoWeb.settings')
        
        try:
            from django.core.management import execute_from_command_line
        except ImportError as exc:
            raise ImportError(
                "Couldn't import Django. Are you sure it's installed and "
                "available on your PYTHONPATH environment variable? Did you "
                "forget to activate a virtual environment?"
            ) from exc

        try:
            # Verificación adicional de la configuración de Django
            import django
            django.setup()
        except Exception as e:
            print(f"Error initializing Django: {e}")
            sys.exit(1)

        execute_from_command_line(sys.argv)
        
    except CommandError as e:
        print(f"Command Error: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nOperation cancelled by user")
        sys.exit(0)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()