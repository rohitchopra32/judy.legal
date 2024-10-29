# judy.legal

## Overview
This is a simple Customer Support App built with Django, Angular, and TailwindCSS.
It allows users to create, view, resolve, and delete support tickets.

### Prerequisites
- Python 3.x
- Node.js & npm
- Angular CLI

### Backend Setup (Django)
1. Clone the repository and navigate to the backend directory.
2. Create virtual Environment
    ```bash
    python -m venv env
    source env/bin/activate
    ```
3. Install dependencies:
   ```bash
   pip install -r requirements/requirements.txt
   ```
4. Run migration and collectstatic
    ```bash
    python manage.py migrate
    python manage.py collectstatic
    ```
5. Run backend server
    ```bash
    python manage.py runserver
    ```

### Backend Setup (Django)
1. Clone the repository and navigate to the backend directory.
2. Create virtual Environment
    ```bash
    python -m venv env
    source env/bin/activate
    ```
3. Install dependencies:
   ```bash
   pip install -r requirements/requirements.txt
   ```
4. Run migration and collectstatic
    ```bash
    python manage.py migrate
    python manage.py collectstatic
    ```
5. Run backend server
    ```bash
    python manage.py runserver
    ```
### Backend Setup (Django)
1. Move inside frontend folder
    ```bash
    cd frontend
    ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Start application
    ```bash
    npm run start
    ```

### Testing
1. Run Django Unit Tests
    ```bash
    python manage.py test
    ```
2. Run Angular Unit Tests
    ```bash
    npm run test --prefix .\frontend\
    ```
