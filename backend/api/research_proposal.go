package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type ResearchProposalSuccessResponse struct {
	Status string `json:"status"`
	Data   *[]repository.ResearchProposal `json:"data"`
}

type ApplyResearchProposalResponse struct {
	Status string `json:"status"`
	ProposalId int64 `json:"proposal_id"`
}

type ResearchProposalErrorDetailResponse struct {
	Name    string `json:"name"`
	Message string `json:"message"`
}

type ResearchProposalErrorResponse struct {
	Error ResearchProposalErrorDetailResponse `json:"error"`
}

func (api *API) getResearcherProposalStatus(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

	username := r.Context().Value("username")

	userId, err := api.usersRepo.FetchUserIdByUsername(username.(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ResearchProposalErrorResponse{Error: ResearchProposalErrorDetailResponse{
			Name: "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	researchProposal, err := api.researchProposalRepo.GetResearcherProposals(*userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ResearchProposalErrorResponse{Error: ResearchProposalErrorDetailResponse{
			Name: "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ResearchProposalSuccessResponse{Status: "success", Data: researchProposal})
}

func (api *API) applyResearchProposal(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

	username := r.Context().Value("username")

	userId, err := api.usersRepo.FetchUserIdByUsername(username.(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ResearchProposalErrorResponse{Error: ResearchProposalErrorDetailResponse{
			Name: "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	researcherId, err := api.researcherProfileRepo.GetResearcherIdByUserId(*userId)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(ResearchProposalErrorResponse{Error: ResearchProposalErrorDetailResponse{
			Name: "Not Found",
			Message: "Researcher with the user_id not found",
		}})
		return
	}

	rawChallengeId := r.URL.Query().Get("challenge_id")
	if rawChallengeId == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name: "Invalid URL Parameter",
			Message: "challenge_id is required",
		}})
		return
	}

	challengeId, err := strconv.Atoi(rawChallengeId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name: "Internal Server Error",
			Message: "internal server error",
		}})
		return
	}

	challengeIsExist, _ := api.industryChallengeRepo.CheckChallengeById(challengeId)
	if !*challengeIsExist {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Not Found",
			Message: "challenge_id is not exist",
		}})
		return
	}

	proposalId, err := api.researchProposalRepo.ApplyResearchProposal(*researcherId, int64(challengeId))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name: "Internal Server Error",
			Message: "internal server error",
		}})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ApplyResearchProposalResponse{
		Status: "success",
		ProposalId: proposalId,
	})
}
