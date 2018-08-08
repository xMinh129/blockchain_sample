from blockchain_hack.main import app, engine
from blockchain_hack.models import Base

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010)
    Base.metadata.create_all(engine)

