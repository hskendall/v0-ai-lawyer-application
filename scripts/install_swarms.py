import subprocess
import sys

def install_swarms():
    """Install the Swarms framework"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "swarms"])
        print("✅ Swarms framework installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing Swarms: {e}")
        return False
    return True

if __name__ == "__main__":
    install_swarms()
