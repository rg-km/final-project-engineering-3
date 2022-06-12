package repository

import (
	"database/sql"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID 			int64 	`json:"id"`
	Username 	string	`json:"username"`
	Password 	string 	`json:"password"`
	Email 		string 	`json:"email"`
	RoleID 		int64 	`json:"role_id"`
	IsLoggedin 	bool 	`json:"is_loggedin"`
}

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (u *UserRepository) Login(username, password string) (*string, *int64,  error) {
	var sqlStatement string
	var user User


	sqlStatement = "SELECT id, username, password, role_id, is_logged_in FROM user WHERE username = ?"	

	row := u.db.QueryRow(sqlStatement, username, password)
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.RoleID,
		&user.IsLoggedin,
	)
	if err != nil {
		return nil, nil, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, nil, err
	}

	sqlStatement = "UPDATE user SET is_logged_in = 1 WHERE id = ?"

	_, err = u.db.Exec(sqlStatement, user.ID)
	if err != nil {
		return nil, nil, err
	}

	return &user.Username, &user.RoleID, nil
}

func (u *UserRepository) FetchRoleByID(id int64) (*string, error) {
	var sqlStatement string
	var role string

	sqlStatement = "SELECT name FROM role WHERE id = ?"	

	row := u.db.QueryRow(sqlStatement, id)
	err := row.Scan(&role)
	if err != nil {
		return nil, err
	}

	return &role, nil
}
