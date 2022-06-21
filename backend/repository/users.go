package repository

import (
	"database/sql"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID         int64  `json:"id"`
	Username   string `json:"username"`
	Password   string `json:"password"`
	Email      string `json:"email"`
	RoleID     int64  `json:"role_id"`
	IsLoggedin bool   `json:"is_loggedin"`
}

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (u *UserRepository) Login(username, password string) (*string, *int64, error) {
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

func (u *UserRepository) FetchUserIdByUsername(username string) (*int64, error) {
	var sqlStatement string
	var id int64

	sqlStatement = "SELECT id FROM user WHERE username = ?"

	row := u.db.QueryRow(sqlStatement, username)
	err := row.Scan(&id)
	if err != nil {
		return nil, err
	}

	return &id, nil
}

func (u *UserRepository) Register(username, password, email string, role_id int64) (*int64, error) {
	var sqlStatement string
	var id int64

	sqlStatement = "INSERT INTO user (username, password, email, role_id, is_logged_in, activation_token, activation_token_expiration) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id"

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	row := u.db.QueryRow(sqlStatement, username, hashedPassword, email, role_id, 0, "", "")
	err = row.Scan(&id)
	if err != nil {
		return nil, err
	}

	if role_id == 2 {
		sqlStatement = `INSERT INTO industry_profile (user_id) VALUES (?)`
		_, err = u.db.Exec(sqlStatement, id)
		if err != nil {
			return nil, err
		}
	} else if role_id == 3 {
		sqlStatement = `INSERT INTO researcher_profile (user_id) VALUES (?)`
		_, err = u.db.Exec(sqlStatement, id)
		if err != nil {
			return nil, err
		}
	}

	return &id, nil
}

func (u *UserRepository) Logout(userId int64) (*bool, error) {
	var sqlStatement string
	var returningId int64
	isLoggedOut := false

	sqlStatement = `
		UPDATE user
		SET is_logged_in = 0
		WHERE id = ?
		RETURNING id
	`

	res := u.db.QueryRow(sqlStatement, userId)
	res.Scan(&returningId)

	if returningId == userId {
		isLoggedOut = true
	}

	return &isLoggedOut, nil
}

func (u *UserRepository) CheckUsernameAndEmail(username, email string) (bool) {
	var sqlStatement string
	var userId int64

	sqlStatement = `
		SELECT id
		FROM user
		WHERE username = ?
		OR email = ?
	`

	res := u.db.QueryRow(sqlStatement, username, email)
	res.Scan(&userId)

	return userId > 0
}