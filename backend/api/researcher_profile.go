package api

import (
	"encoding/json"
	"net/http"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type ResearcherProfileSuccessResponse struct {
	Status string `json:"status"`
	Data   *repository.ResearcherProfile `json:"data"`
}

type ResearcherProfileErrorResponse struct {
	Error string `json:"error"`
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

	response := ResearcherProfileSuccessResponse{
		Status: "success",
		Data: researcherProfile,
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}