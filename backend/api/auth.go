package api

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/asaskevich/govalidator"
	"github.com/golang-jwt/jwt/v4"
)

type LoginSuccessResponse struct {
	Username       string `json:"username"`
	Role           string `json:"role"`
	Token          string `json:"token"`
	IsDataComplete bool   `json:"isDataComplete"`
}

type RegisterSuccessResponse struct {
	ID      int64  `json:"user_id"`
	Status  string `json:"status"`
	Message string `json:"message"`
}

type LogoutSuccessResponse struct {
	Status  string `json:"status"`
	Mesaage string `json:"message"`
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
	Username string `json:"username" valid:"required"`
	Password string `json:"password" valid:"required"`
	Email    string `json:"email" valid:"required,email"`
	Role     int64  `json:"role_id" valid:"required,numeric"`
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

	userId, err := api.usersRepo.FetchUserIdByUsername(*username)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	isDataComplete := api.checkUserDataComplete(*roleID, *userId)

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
		Name:     "token",
		Value:    tokenString,
		Expires:  tokenExpirationTime,
		Path:     "/",
		HttpOnly: false,
		SameSite: http.SameSiteStrictMode,
		Domain:   "fundingresearch.com",
	})

	response := LoginSuccessResponse{
		Username:       *username,
		Role:           *roleName,
		Token:          tokenString,
		IsDataComplete: isDataComplete,
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

	sanitizeInputResult := api.sanitizeCredential(creds)
	if sanitizeInputResult != "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: sanitizeInputResult})
		return
	}

	isUsernameOrEmailExist := api.usersRepo.CheckUsernameAndEmail(creds.Username, creds.Email)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	if isUsernameOrEmailExist {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: "Username or email already exist!"})
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

func (api *API) logout(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

	cookie, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(AuthErrorResponse{Error: "You are not logged in!"})
			return
		}

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	if cookie.Value == "" {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	userId, err := api.usersRepo.FetchUserIdByUsername(r.Context().Value("username").(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	isLoggedOut, err := api.usersRepo.Logout(*userId)
	if !*isLoggedOut {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(AuthErrorResponse{Error: err.Error()})
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:   "token",
		Value:  "",
		MaxAge: -1,
	})
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(LogoutSuccessResponse{
		Status:  "success",
		Mesaage: "Logout successful",
	})
}

func (api *API) checkUserDataComplete(roleID, userId int64) bool {
	if roleID == 2 {
		industryId, err := api.industryProfilesRepo.GetIndustryIdByUserId(userId)
		if err != nil {
			return false
		}

		industryProfile, err := api.industryProfilesRepo.GetIndustryProfile(*industryId)
		if err != nil {
			return false
		}

		if industryProfile.Name == "" || industryProfile.Description == "" || industryProfile.Address == "" || industryProfile.IndustryCategory == "" || industryProfile.PhoneNumber == "" {
			return false
		} else {
			return true
		}
	} else if roleID == 3 {
		researcherProfile, err := api.researcherProfileRepo.GetResearcherProfile(userId)
		if err != nil {
			return false
		}

		if researcherProfile.TeamName == "" || researcherProfile.LeaderName == "" || researcherProfile.PhoneNumber == "" || researcherProfile.NIDN == "" || researcherProfile.CollegeName == "" || researcherProfile.Address == "" {
			return false
		} else {
			return true
		}
	}
	return false
}

func (api *API) sanitizeCredential(creds Credentials) string {
	_, err := govalidator.ValidateStruct(creds)

	if err != nil {
		return err.Error()
	}

	result := govalidator.HasUpperCase(creds.Password)
	if !result {
		return "Password must contain at least one uppercase letter"
	}

	result = govalidator.MinStringLength(creds.Password, "8")
	if !result {
		return "Password must be at least 8 characters long"
	}

	result = govalidator.StringLength(creds.Username, "3", "20")
	if !result {
		return "Username must be between 3 and 20 characters long"
	}

	return ""
}
