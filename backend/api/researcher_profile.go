package api

import (
	"encoding/json"
	"net/http"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type ResearcherProfileSuccessResponse struct {
	Status  string                        `json:"status"`
	Message string                        `json:"message"`
	User    *repository.User              `json:"user"`
	Data    *repository.ResearcherProfile `json:"data"`
	ID      int64                         `json:"profile_id"`
}

type ResearcherProfileErrorResponse struct {
	Error string `json:"error"`
}

type ResearcherProfileRequest struct {
	TeamName       string `json:"team_name"`
	LeaderName     string `json:"leader_name"`
	Phone          string `json:"phone"`
	Nidn           string `json:"nidn"`
	CollageName    string `json:"collage_name"`
	Address        string `json:"address"`
	BankAccountNum string `json:"bank_account_num"`
	BankName       string `json:"bank_name"`
	UserId         int64  `json:"user_id"`
}

func (api *API) getResearcherProfile(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

	username := r.Context().Value("username")

	userId, err := api.usersRepo.FetchUserIdByUsername(username.(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ResearcherProfileErrorResponse{Error: err.Error()})
	}

	researcherProfile, err := api.researcherProfileRepo.GetResearcherProfile(*userId)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ResearcherProfileErrorResponse{Error: err.Error()})
		return
	}

	user, err := api.usersRepo.GetUserById(*userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: err.Error()})
		return
	}

	response := ResearcherProfileSuccessResponse{
		Status:  "success",
		Message: "Get success",
		User:    user,
		Data:    researcherProfile,
		ID:      researcherProfile.Id,
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (api *API) addResearcherProfile(w http.ResponseWriter, r *http.Request) {
	researcherProfile := ResearcherProfileRequest{}
	err := json.NewDecoder(r.Body).Decode(&researcherProfile)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(EditErrorResponse{Error: err.Error()})
		return
	}

	var profileId *int64
	profileId, err = api.researcherProfileRepo.AddResearcherProfile(
		researcherProfile.TeamName,
		researcherProfile.LeaderName,
		researcherProfile.Phone,
		researcherProfile.Nidn,
		researcherProfile.CollageName,
		researcherProfile.Address,
		researcherProfile.BankAccountNum,
		researcherProfile.BankName,
		researcherProfile.UserId,
	)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ResearcherProfileErrorResponse{Error: err.Error()})
		return
	}

	response := ResearcherProfileSuccessResponse{
		Status:  "success",
		Message: "Researcher profile added successfully",
		ID:      *profileId,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
