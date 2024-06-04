CREATE MIGRATION m12q3vleyrgxso3qp6r7pdrrawuie3hpc5kvhygi5esbmejjlphvvq
    ONTO m1bhh2bqgppyqqxogtq4iihnujv5zou22lroaf7jcirsgy4dntkb3a
{
  ALTER TYPE default::Borrowing {
      ALTER PROPERTY borrow_date {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
      ALTER PROPERTY return_date {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY created_at {
          SET default := (std::datetime_of_statement());
          SET readonly := true;
      };
  };
};
