package api

import (
	"encoding/json"
	"net/http"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type ResearchProposalSuccessResponse struct {
	Status string `json:"status"`
	Data   *[]repository.ResearchProposal `json:"data"`
}

type ResearchProposalErrorResponse struct {
	Error string `json:"error"`
}

func (api *API) getResearcherProposalStatus(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

	username := r.Context().Value("username")

	userId, err := api.usersRepo.FetchUserIdByUsername(username.(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ResearchProposalErrorResponse{Error: err.Error()})
		return
	}

	researchProposal, err := api.researchProposalRepo.GetResearcherProposals(*userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ResearchProposalErrorResponse{Error: err.Error()})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ResearchProposalSuccessResponse{Status: "success", Data: researchProposal})
}