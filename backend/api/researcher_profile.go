package api

import (
	"encoding/json"
	"net/http"
)

type ResearcherProfileResponse struct {
	Status string `json:"status"`
	Data   struct {
		ID          int64  `json:"id"`
		Name        string `json:"name"`
		Address     string `json:"address"`
		Description string `json:"description"`
		Logo        string `json:"logo"`
	} `json:"data"`
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

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(researcherProfile)
}