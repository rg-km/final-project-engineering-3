package api

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type ResearchProposalReviewResponse struct {
	Status            string                        `json:"status"`
	ResearcherProfile *repository.ResearcherProfile `json:"researcher_profile"`
	Proposal          *repository.Proposal          `json:"proposal"`
	FundingStatus     *repository.FundingStatus     `json:"funding_status"`
}

type ReviewErrorDetailResponse struct {
	Name    string `json:"name"`
	Message string `json:"message"`
}

type ReviewErrorResponse struct {
	Error ReviewErrorDetailResponse `json:"error"`
}

func (api *API) getTheChallengers(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	var listOfChallenger *[]repository.Challenger

	challengeIdString, ok := r.URL.Query()["challenge_id"]
	challengeId, _ := strconv.Atoi(challengeIdString[0])
	if !ok || challengeId < 1 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: "challenge_id is required",
		}})
		return
	}

	listOfChallenger, err := api.industryChallengeRepo.GetAllChallengers(challengeId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ChallengersSuccessResponse{
		Status:      "Success",
		Challengers: *listOfChallenger,
	})
}

func (api *API) getReviewrReviewDetails(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	var researchProposalReview *repository.ResearchProposalReview
	var proposal *repository.Proposal
	var researcherProfile *repository.ResearcherProfile
	var fundingStatus *repository.FundingStatus

	reviewIdString, ok := r.URL.Query()["review_id"]
	if !ok || len(reviewIdString) != 1 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ReviewErrorResponse{Error: ReviewErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: "Reviewer_id is required",
		}})
		return
	}

	reviewId, _ := strconv.Atoi(reviewIdString[0])
	researchProposalReview, err := api.proposalReviewRepo.GetResearchProposalReview(reviewId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ReviewErrorResponse{Error: ReviewErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: "Failed to get Proposal review details",
		}})
		return
	}

	proposal, err = api.researchProposalRepo.GetProposalById(researchProposalReview.ProposalId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ReviewErrorResponse{Error: ReviewErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: "Failed to get Proposal details",
		}})
		return
	}

	researcherProfile, err = api.researcherProfileRepo.GetResearcherProfileById(proposal.ResearcherId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ReviewErrorResponse{Error: ReviewErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: "Failed to get Researcher Profil details",
		}})
	}

	fundingStatus, err = api.proposalReviewRepo.GetFundingStatus(int(researchProposalReview.FundingStatusId))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ReviewErrorResponse{Error: ReviewErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: "Failed to get Funding Status details",
		}})
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ResearchProposalReviewResponse{
		Status:            "success",
		ResearcherProfile: researcherProfile,
		Proposal:          proposal,
		FundingStatus:     fundingStatus,
	})
}
