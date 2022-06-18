package api

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/golang-jwt/jwt/v4"
)

type ErrorResponse struct {
	Error string `json:"error"`
}

func (api *API) AllowOrigin(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if req.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
	}
}

func (api *API) AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		api.AllowOrigin(w, r)
		encoder := json.NewEncoder(w)

		c, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				w.WriteHeader(http.StatusUnauthorized)
				encoder.Encode(AuthErrorResponse{Error: "Cookies not found, Login first!"})
				return
			}

			w.WriteHeader(http.StatusBadRequest)
			encoder.Encode(AuthErrorResponse{Error: "Login first!"})
			return
		}

		tokenString := c.Value

		claims := &Claims{}

		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				w.WriteHeader(http.StatusUnauthorized)
				encoder.Encode(AuthErrorResponse{Error: err.Error()})
			}

			w.WriteHeader(http.StatusBadRequest)
			encoder.Encode(AuthErrorResponse{Error: err.Error()})
			return
		}

		if !token.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			encoder.Encode(AuthErrorResponse{Error: "Token is not valid!"})
			return
		}

		ctx := context.WithValue(r.Context(), "username", claims.Username)
		ctx = context.WithValue(ctx, "role", claims.Role)
		ctx = context.WithValue(ctx, "props", claims)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (api *API) AdminMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		api.AllowOrigin(w, r)
		encoder := json.NewEncoder(w)

		role := r.Context().Value("role")
		if role != "admin" {
			w.WriteHeader(http.StatusForbidden)
			encoder.Encode(ErrorResponse{Error: "You are not admin!"})
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (api *API) IndustryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		api.AllowOrigin(w, r)
		encoder := json.NewEncoder(w)

		role := r.Context().Value("role")
		if role != "industry" {
			w.WriteHeader(http.StatusForbidden)
			encoder.Encode(ErrorResponse{Error: "You are not industry!"})
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (api *API) ResearcherMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		api.AllowOrigin(w, r)
		encoder := json.NewEncoder(w)

		role := r.Context().Value("role")
		if role != "researcher" {
			w.WriteHeader(http.StatusForbidden)
			encoder.Encode(ErrorResponse{Error: "You are not researcher!"})
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (api *API) GET(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		api.AllowOrigin(w, r)
		encoder := json.NewEncoder(w)
		if r.Method != http.MethodGet {
			w.WriteHeader(http.StatusMethodNotAllowed)
			encoder.Encode(ErrorResponse{Error: "Need GET Method!"})
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (api *API) POST(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		api.AllowOrigin(w, r)
		encoder := json.NewEncoder(w)
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			encoder.Encode(ErrorResponse{Error: "Need POST Method!"})
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (api *API) PUT(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		api.AllowOrigin(w, r)
		encoder := json.NewEncoder(w)
		if r.Method != http.MethodPut {
			w.WriteHeader(http.StatusMethodNotAllowed)
			encoder.Encode(ErrorResponse{Error: "Need PUT Method!"})
			return
		}

		next.ServeHTTP(w, r)
	})
}

func (api *API) DELETE(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		api.AllowOrigin(w, r)
		encoder := json.NewEncoder(w)
		if r.Method != http.MethodDelete {
			w.WriteHeader(http.StatusMethodNotAllowed)
			encoder.Encode(ErrorResponse{Error: "Need DELETE Method!"})
			return
		}

		next.ServeHTTP(w, r)
	})
}
