CREATE MIGRATION m1vsonqb7glmmd6ebx3kw3xt2qxdv325gmhxrmldmips66hq4udnaq
    ONTO m12q3vleyrgxso3qp6r7pdrrawuie3hpc5kvhygi5esbmejjlphvvq
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY full_name: std::str {
          SET REQUIRED USING (<std::str>{'Unknown'});
      };
      CREATE REQUIRED PROPERTY password: std::str {
          SET REQUIRED USING (<std::str>{'default_password'});
      };
  };
};
