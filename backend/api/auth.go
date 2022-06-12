package api

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type LoginSuccessResponse struct {
	Username string `json:"username"`
	Token    string `json:"token"`
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
}

func (api *API) login(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	var creds Credentials

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	username, roleID, err := api.usersRepo.Login(creds.Username, creds.Password)
	if err != nil {
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	roleName, err := api.usersRepo.FetchRoleByID(*roleID)
	if err != nil {
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		w.WriteHeader(http.StatusInternalServerError)
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
		Name:     "token",
		Value:    tokenString,
		Expires:  tokenExpirationTime,
	})
	
	response := LoginSuccessResponse{
		Username: *username,
		Token:    tokenString,
	}

	json.NewEncoder(w).Encode(response)
}
