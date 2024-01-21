import subprocess

def install_dependencies():
    try:
        subprocess.check_call(['pip', 'install', '-r', 'packages.txt'])
        print("Paczki zostały pomyślnie zainstalowane.")
    except subprocess.CalledProcessError as e:
        print(f"Błąd podczas instalacji paczek: {e}")

if __name__ == "__main__":
    install_dependencies()
