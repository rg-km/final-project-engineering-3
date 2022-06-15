package api

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type LoginSuccessResponse struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	Token    string `json:"token"`
}

type RegisterSuccessResponse struct {
	ID      int64  `json:"user_id"`
	Status  string `json:"status"`
	Message string `json:"message"`
}

type AuthErrorResponse struct {
	Error string `json:"error"`
}

var jwtKey = []byte("jwtSecretKey")

type Claims struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.StandardClaims
}

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Role     int64  `json:"role_id"`
}

func (api *API) login(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	var creds Credentials

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	username, roleID, err := api.usersRepo.Login(creds.Username, creds.Password)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: "Login failed!"})
		return
	}

	roleName, err := api.usersRepo.FetchRoleByID(*roleID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	tokenExpirationTime := time.Now().Add(time.Hour * 1)

	claims := Claims{
		Username: *username,
		Role:     *roleName,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: tokenExpirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: tokenExpirationTime,
	})

	response := LoginSuccessResponse{
		Username: *username,
		Role:     *roleName,
		Token:    tokenString,
	}

	json.NewEncoder(w).Encode(response)
}

func (api *API) register(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	var creds Credentials

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	id, err := api.usersRepo.Register(creds.Username, creds.Password, creds.Email, creds.Role)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	response := RegisterSuccessResponse{
		ID:      *id,
		Status:  "success",
		Message: "User registered successfully",
	}

	json.NewEncoder(w).Encode(response)
}
