from setuptools import setup

setup(
    name='blockchain',
    version='0.0.1',
    url='',
    python_requires='>=2.7, <3',
    install_requires=['Flask==0.12.2',
                      'Flask-SQLAlchemy==2.3.1',
                      'Flask-Bcrypt==0.7.1',
                      'SQLAlchemy==1.1.0b3',
                      'Flask-Migrate==2.1.1',
                       'Flask-Script==2.0.6',
                      'pyjwt==1.4.2',
                      'flask_cors==3.0.3'
                      ]
)
