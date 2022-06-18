package api

import (
	"encoding/json"
	"net/http"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type EditSuccessResponse struct {
	Status string                      `json:"status"`
	Data   *repository.IndustryProfile `json:"data"`
}

type EditErrorResponse struct {
	Error string `json:"error"`
}

type IndustryProfileRequest struct {
	Name               string `json:"name"`
	Address            string `json:"address"`
	Description        string `json:"description"`
	IndustryCategoryID int64  `json:"industry_category_id"`
	NumOfEmployees     int64  `json:"num_of_employees"`
	PhoneNumber        string `json:"phone_number"`
	Logo               string `json:"logo"`
}

func (api *API) getIndustryProfile(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	username := r.Context().Value("username")
	var userId *int64
	userId, err := api.usersRepo.FetchUserIdByUsername(username.(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: err.Error()})
	}

	profileId, err := api.industryProfilesRepo.GetIndustryIdByUserId(*userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: err.Error()})
		return
	}

	profileData, err := api.industryProfilesRepo.GetIndustryProfile(*profileId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(EditSuccessResponse{
		Status: "Success",
		Data:   profileData,
	})
}

func (api *API) editIndustryProfile(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	industryProfile := IndustryProfileRequest{}
	err := json.NewDecoder(r.Body).Decode(&industryProfile)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: err.Error()})
		return
	}

	username := r.Context().Value("username")
	var userId *int64
	userId, err = api.usersRepo.FetchUserIdByUsername(username.(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: err.Error()})
	}

	var profileData *repository.IndustryProfile
	profileData, err = api.industryProfilesRepo.EditIndustryProfile(
		industryProfile.Name,
		industryProfile.Address,
		industryProfile.Description,
		industryProfile.IndustryCategoryID,
		industryProfile.NumOfEmployees,
		industryProfile.PhoneNumber,
		industryProfile.Logo,
		*userId,
	)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(EditSuccessResponse{
		Status: "Success",
		Data:   profileData,
	})
}
