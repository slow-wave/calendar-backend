export const UserQueries = {
  AddUser: `
    INSERT INTO user (username, password, email, android_token) 
    VALUES (?, ?, ?, ?);`,

  GetUserByName: `
    SELECT * FROM user WHERE username=?;`,

  GetUserById: `
    SELECT * FROM user WHERE id=?;`,

  GetUserByEmail: `
    SELECT * FROM user WHERE email=?;`,

  DeleteUser: `DELETE FROM user WHERE id=?`,
};
