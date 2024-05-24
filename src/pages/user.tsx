import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Users } from "./api/user";

const UserPage = () => {
  const [user, setUser] = useState<Users[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/user`);
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <main>
      <h1>User</h1>
      <div style={{ height: "50px" }}></div>
      {user ? (
        user.map((User) => (
          <a href={`/post/${User.id}`} key={User.id}>
            <div>
              <span>{User.username} </span> :-
              <span> {User.role}</span>
            </div>
          </a>
        ))
      ) : (
        <h1>Loading---</h1>
      )}
    </main>
  );
};

export default UserPage;
