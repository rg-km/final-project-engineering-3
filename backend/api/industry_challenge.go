package api

import (
	"encoding/json"
	"net/http"
	"time"
)

type PostChallengeResponse struct {
	Status      string `json:"status"`
	ChallengeId int64  `json:"challenge_id"`
	Message     string `json:"message"`
}

type PostChallengeErrorDetailResponse struct {
	Name    string `json:"name"`
	Message string `json:"message"`
}

type PostChallengeErrorResponse struct {
	Error PostChallengeErrorDetailResponse `json:"error"`
}

type ChallengeItemRequest struct {
	Name             string    `json:"name"`
	Details          string    `json:"details"`
	ResearchCategory int64     `json:"research_category"`
	PeriodStart      time.Time `json:"period_start"`
	PeriodEnd        time.Time `json:"period_end"`
	MaxFunding       int64     `json:"max_funding"`
	GuideFile        string    `json:"guide_file"`
	Quota            int64     `json:"quota"`
}

func (api *API) postChallenge(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

	var challengeItem ChallengeItemRequest
	err := json.NewDecoder(r.Body).Decode(&challengeItem)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(PostChallengeErrorResponse{Error: PostChallengeErrorDetailResponse{
			Name:    "Invalid JSON",
			Message: err.Error(),
		}})
		return
	}

	var userId *int64
	userId, err = api.usersRepo.FetchUserIdByUsername(r.Context().Value("username").(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(PostChallengeErrorResponse{Error: PostChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	var challengeId *int64
	challengeId, err = api.industryChallengeRepo.PostChallenge(
		challengeItem.Name,
		challengeItem.Details,
		challengeItem.ResearchCategory,
		challengeItem.PeriodStart,
		challengeItem.PeriodEnd,
		challengeItem.MaxFunding,
		challengeItem.GuideFile,
		challengeItem.Quota,
		*userId,
	)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(PostChallengeErrorResponse{Error: PostChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(PostChallengeResponse{
		Status:      "Success",
		ChallengeId: *challengeId,
		Message:     "Research Challenge Post Successful",
	})
}
