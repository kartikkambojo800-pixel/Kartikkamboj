import mimetypes
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

BASE = Path(__file__).resolve().parent
PUBLIC = (BASE / "public").resolve()

class GameHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        requested = unquote(urlsplit(path).path).lstrip("/")
        target = (PUBLIC / requested).resolve()
        try:
            target.relative_to(PUBLIC)
        except ValueError:
            return str(PUBLIC / "__not_found__")
        return str(target)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

if __name__ == "__main__":
    print("KARTIK KAMBOJ Gaming running at http://127.0.0.1:8080")
    print("Press Ctrl+C to stop.")
    ThreadingHTTPServer(("127.0.0.1", 8080), GameHandler).serve_forever()
