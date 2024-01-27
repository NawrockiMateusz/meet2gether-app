import psycopg2
import hashlib

# Function to hash passwords (SHA256)
def hash_password(password):
    hashed = hashlib.sha256(password.encode()).hexdigest()
    return hashed

# Connection parameters
dbname = 'wcvolspc'
user = 'wcvolspc'
password = 'nd_LtBQaktnxR41w_MMvQeGm2Tdd_5BC'
host = 'ella.db.elephantsql.com'
port = '5432'
schema = 'meet2gether'



# Test data
tables = ['UserEvents', 'Events', 'Categories', 'Users']
hashed_passwords = [hash_password('password1'), hash_password('password2'), hash_password('password3')]
users_inserts = [
    f"INSERT INTO Users (Username, Email, Password) VALUES ('jan_kowalski', 'jan.kowalski@example.com', '{hashed_passwords[0]}');",
    f"INSERT INTO Users (Username, Email, Password) VALUES ('anna_nowak', 'anna.nowak@example.com', '{hashed_passwords[1]}');",
    f"INSERT INTO Users (Username, Email, Password) VALUES ('adam_wisniewski', 'adam.wisniewski@example.com', '{hashed_passwords[2]}');"
]

category_inserts = [
    "INSERT INTO Categories (Name, Image) VALUES ('Koncerty', 'concert.png')",
    "INSERT INTO Categories (Name, Image) VALUES ('Wyjście na piwo', 'beer.png')",
    "INSERT INTO Categories (Name, Image) VALUES ('Sport', 'sport.png')"
]

# Lista z inserty dla wydarzeń
event_inserts = [
    "INSERT INTO Events (Category, Name, Location, EventDate, Description) VALUES (1, 'Koncert rockowy', 'Hala widowiskowa', '2024-04-12', 'Niezapomniany wieczór pełen muzyki rockowej!')",
    "INSERT INTO Events (Category, Name, Location, EventDate, Description) VALUES (1, 'Festiwal jazzowy', 'Plac miejski', '2024-05-20', 'Wyjątkowe wydarzenie dla miłośników jazzu.')",
    "INSERT INTO Events (Category, Name, Location, EventDate, Description) VALUES (2, 'Wieczór piwosza', 'Pub \"The Hop\"', '2024-03-25', 'Spotkanie przy piwie w przyjaznej atmosferze.')",
    "INSERT INTO Events (Category, Name, Location, EventDate, Description) VALUES (2, 'Degustacja craft beerów', 'Browar rzemieślniczy', '2024-04-08', 'Odkryj różnorodność smaków piwa rzemieślniczego.')",
    "INSERT INTO Events (Category, Name, Location, EventDate, Description) VALUES (3, 'Mecz piłki nożnej', 'Stadion miejski', '2024-03-15', 'Śledź emocjonujące starcie dwóch drużyn.')",
    "INSERT INTO Events (Category, Name, Location, EventDate, Description) VALUES (3, 'Turniej tenisa stołowego', 'Klub sportowy', '2024-06-05', 'Rywalizacja na najwyższym poziomie w tenisa stołowego.')"
]

userevent_inserts = [
    "INSERT INTO UserEvents (UserId, EventId) VALUES (1, 1)",
    "INSERT INTO UserEvents (UserId, EventId) VALUES (2, 3)",
    "INSERT INTO UserEvents (UserId, EventId) VALUES (3, 5)"
]


# Connection with database
try:
    connection = psycopg2.connect(
        dbname=dbname,
        user=user,
        password=password,
        host=host,
        port=port
    )

    # Testing queries
    cursor = connection.cursor()

    # DELETE
    for table in tables:
        cursor.execute(f'DELETE FROM {table};')

    for table in tables:
        sequence_name = f'{table}_id_seq'
        cursor.execute(f"SELECT setval('{sequence_name}', 1, false);")

    connection.commit()
    print("Data correctly deleted from tables")

    # INSERT
    for query in users_inserts:
        cursor.execute(query)

    for query in category_inserts:
        cursor.execute(query)

    for query in event_inserts:
        cursor.execute(query)

    for query in userevent_inserts:
        cursor.execute(query)
    connection.commit()
    print("Data correctly inserted to tables\n")

    # SELECT
    for table in tables:
        cursor.execute(f"SELECT column_name FROM information_schema.columns WHERE table_schema = '{schema}' AND table_name = LOWER('{table}')")
        columns = cursor.fetchall()
        column_names = [column[0] for column in columns]

        print(f"Table '{table}':")
        print(column_names)

        cursor.execute(f'SELECT * FROM {table}')
        rows = cursor.fetchall()
        for row in rows:
            print(row)

        print("\n")

    # Closing connection
    cursor.close()
    connection.close()

except psycopg2.Error as error:
    print('Error message: ', error)