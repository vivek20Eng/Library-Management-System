module default {
    # Enum types

    scalar type RoleEnum extending enum <"admin", "user">;

    # Define the User entity
    type User {
        overloaded required property id : std::uuid {
            constraint exclusive
        };
        required property username -> str;
        required property email -> str;
        required property phone -> str;
        required property role : RoleEnum;
        required property created_at -> datetime;

        # Define the relationship with Borrowing
        multi link borrowings -> Borrowing;
    }

    # Define the Book entity
    type Book {
        overloaded required property id : std::uuid {
            constraint exclusive
        };
        required property title -> str;
        required property author -> str;
        required property genre -> str;
        required property published_year -> int16;
        required property available -> bool;

        # Define the relationship with Borrowing
        multi link borrowings -> Borrowing;
    }

    # Define the Borrowing entity
    type Borrowing {
        overloaded required property id : std::uuid {
            constraint exclusive
        };
        required link user -> User;
        required link book -> Book;
        required property borrow_date -> datetime;
        property return_date -> datetime;
        required property returned -> bool;
        property fine_amount -> decimal;
        }

}
