package api

import (
	"encoding/json"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"

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
	industryProfileReq := IndustryProfileRequest{}
	var industryProfile *repository.IndustryProfile
	var err error

	username := r.Context().Value("username")
	var userId *int64
	userId, err = api.usersRepo.FetchUserIdByUsername(username.(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Invalid fetch user id"})
		return
	}

	profileId, err := api.industryProfilesRepo.GetIndustryIdByUserId(*userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Invalid fetch industry id"})
		return
	}

	industryProfile, err = api.industryProfilesRepo.GetIndustryProfile(*profileId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Invalid fetch profil"})
		return
	}

	industryProfileReq.Name = r.FormValue("name")
	if industryProfileReq.Name == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Require industry name"})
		return
	}

	industryProfileReq.Address = r.FormValue("address")
	if industryProfileReq.Address == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Require address"})
		return
	}

	industryProfileReq.Description = r.FormValue("description")
	if industryProfileReq.Description == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Require description"})
		return
	}

	industryProfileReq.IndustryCategoryID, err = strconv.ParseInt(r.FormValue("industry_category_id"), 10, 64)
	if err != nil || industryProfileReq.IndustryCategoryID == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Require industry_category_id"})
		return
	}

	industryProfileReq.NumOfEmployees, err = strconv.ParseInt(r.FormValue("num_of_employees"), 10, 64)
	if err != nil || industryProfileReq.NumOfEmployees == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Require num_of_employees"})
		return
	}

	industryProfileReq.PhoneNumber = r.FormValue("phone_number")
	if industryProfileReq.Description == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Require phone_number"})
		return
	}

	var logo multipart.File
	logo, handler, err := r.FormFile("logo")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Require logo"})
		return
	}
	defer logo.Close()

	fileLocation, err := api.uploadLogo(int(industryProfile.Id), *handler, logo, "logo")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: err.Error()})
		return
	}

	var profileData *repository.IndustryProfile
	profileData, err = api.industryProfilesRepo.EditIndustryProfile(
		industryProfileReq.Name,
		industryProfileReq.Address,
		industryProfileReq.Description,
		industryProfileReq.IndustryCategoryID,
		industryProfileReq.NumOfEmployees,
		industryProfileReq.PhoneNumber,
		*fileLocation,
		*profileId,
	)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: "Invalid update"})
		return
	} else {
		os.Remove(industryProfile.Logo)
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(EditSuccessResponse{
		Status: "Success",
		Data:   profileData,
	})
}
