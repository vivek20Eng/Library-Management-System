CREATE MIGRATION m1bhh2bqgppyqqxogtq4iihnujv5zou22lroaf7jcirsgy4dntkb3a
    ONTO initial
{
  CREATE TYPE default::Book {
      ALTER PROPERTY id {
          SET OWNED;
          SET REQUIRED;
          SET TYPE std::uuid;
          ALTER CONSTRAINT std::exclusive {
              SET OWNED;
          };
      };
      CREATE REQUIRED PROPERTY author: std::str;
      CREATE REQUIRED PROPERTY available: std::bool;
      CREATE REQUIRED PROPERTY genre: std::str;
      CREATE REQUIRED PROPERTY published_year: std::int16;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  CREATE TYPE default::Borrowing {
      ALTER PROPERTY id {
          SET OWNED;
          SET REQUIRED;
          SET TYPE std::uuid;
          ALTER CONSTRAINT std::exclusive {
              SET OWNED;
          };
      };
      CREATE REQUIRED LINK book: default::Book;
      CREATE REQUIRED PROPERTY borrow_date: std::datetime;
      CREATE PROPERTY fine_amount: std::decimal;
      CREATE PROPERTY return_date: std::datetime;
      CREATE REQUIRED PROPERTY returned: std::bool;
  };
  ALTER TYPE default::Book {
      CREATE MULTI LINK borrowings: default::Borrowing;
  };
  CREATE SCALAR TYPE default::RoleEnum EXTENDING enum<admin, user>;
  CREATE TYPE default::User {
      ALTER PROPERTY id {
          SET OWNED;
          SET REQUIRED;
          SET TYPE std::uuid;
          ALTER CONSTRAINT std::exclusive {
              SET OWNED;
          };
      };
      CREATE MULTI LINK borrowings: default::Borrowing;
      CREATE REQUIRED PROPERTY created_at: std::datetime;
      CREATE REQUIRED PROPERTY email: std::str;
      CREATE REQUIRED PROPERTY phone: std::str;
      CREATE REQUIRED PROPERTY role: default::RoleEnum;
      CREATE REQUIRED PROPERTY username: std::str;
  };
  ALTER TYPE default::Borrowing {
      CREATE REQUIRED LINK user: default::User;
  };
};
