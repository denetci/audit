from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser


HOST = "127.0.0.1"
PORT = 8000
PROJECT_DIR = Path(__file__).resolve().parent
STATIC_DIR = PROJECT_DIR / "static"


class DashboardHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC_DIR), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    address = (HOST, PORT)
    server = ThreadingHTTPServer(address, DashboardHandler)
    url = f"http://{HOST}:{PORT}/"

    print("Ic Denetim Baskanligi paneli calisiyor..", flush=True)
    print(f"Tarayicida ac: {url}", flush=True)
    print("Durdurmak icin PyCharm terminalinde Ctrl+C kullan.", flush=True)

    webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nIc Denetim Baskanligi paneli kapatildi.", flush=True)
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
