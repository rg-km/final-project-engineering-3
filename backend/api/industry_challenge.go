package api

import (
	"encoding/json"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type ChallengeSuccessResponse struct {
	Status      string `json:"status"`
	ChallengeId int64  `json:"challenge_id"`
	Message     string `json:"message"`
}

type ChallengeDetailsResponse struct {
	Status string                            `json:"status"`
	Data   *repository.ResearchChallengeItem `json:"data"`
}

type ChallengeErrorDetailResponse struct {
	Name    string `json:"name"`
	Message string `json:"message"`
}

type ChallengeErrorResponse struct {
	Error ChallengeErrorDetailResponse `json:"error"`
}

// type ChallengeItemRequest struct {
// 	Name             string    `json:"name"`
// 	Details          string    `json:"details"`
// 	ResearchCategory int64     `json:"research_category"`
// 	PeriodStart      time.Time `json:"period_start"`
// 	PeriodEnd        time.Time `json:"period_end"`
// 	MaxFunding       int64     `json:"max_funding"`
// 	GuideFile        string    `json:"guide_file"`
// 	Quota            int64     `json:"quota"`
// }
type ChallengeItemRequest struct {
	Name             string
	Details          string
	ResearchCategory int64
	PeriodStart      time.Time
	PeriodEnd        time.Time
	MaxFunding       int64
	GuideFile        string
	Quota            int64
}

type ChallengersSuccessResponse struct {
	Status      string                  `json:"status"`
	Challengers []repository.Challenger `json:"challengers"`
}

func (api *API) getChallengeById(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

	rawChallengeId := r.URL.Query().Get("challenge_id")
	if rawChallengeId == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: "challenge_id is required",
		}})
		return
	}

	challengeId, err := strconv.Atoi(rawChallengeId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
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

	researchChallengeItem, err := api.industryChallengeRepo.GetChallengeById(challengeId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	response := ChallengeDetailsResponse{
		Status: "success",
		Data:   researchChallengeItem,
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func (api *API) postChallenge(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

	var challengeItem = &ChallengeItemRequest{}
	var err error

	challengeItem.Name = r.FormValue("name")
	if challengeItem.Name == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: "name is required",
		}})
		return
	}

	challengeItem.Details = r.FormValue("details")
	if challengeItem.Details == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: "details is required",
		}})
		return
	}

	challengeItem.ResearchCategory, err = strconv.ParseInt(r.FormValue("research_category"), 10, 64)
	if err != nil || challengeItem.ResearchCategory == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: "research_category is required",
		}})
		return
	}

	challengeItem.PeriodStart, err = time.Parse(time.RFC3339, r.FormValue("period_start"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: err.Error(),
		}})
		return
	}

	challengeItem.PeriodEnd, err = time.Parse(time.RFC3339, r.FormValue("period_end"))
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: err.Error(),
		}})
		return
	}

	challengeItem.MaxFunding, err = strconv.ParseInt(r.FormValue("max_funding"), 10, 64)
	if err != nil || challengeItem.MaxFunding == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: "max_funding is required",
		}})
		return
	}

	var guideFile multipart.File
	guideFile, _, err = r.FormFile("guide_file")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: "guide_file is required",
		}})
		return
	}
	defer guideFile.Close()

	challengeItem.Quota, err = strconv.ParseInt(r.FormValue("quota"), 10, 64)
	if err != nil || challengeItem.Quota == 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid URL Parameter",
			Message: "quota is required",
		}})
		return
	}

	var userId *int64
	userId, err = api.usersRepo.FetchUserIdByUsername(r.Context().Value("username").(string))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	industryId, err := api.industryProfilesRepo.GetIndustryIdByUserId(*userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	guideFileLocation, err := api.uploadGuideFile(int(*industryId), guideFile, "guide")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
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
		guideFileLocation,
		challengeItem.Quota,
		*industryId,
	)
	if err != nil {
		os.Remove(guideFileLocation)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ChallengeSuccessResponse{
		Status:      "Success",
		ChallengeId: *challengeId,
		Message:     "Research Challenge Post Successful",
	})
}

func (api *API) editChallenge(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

	var challengeItem ChallengeItemRequest
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

	challengeIsExist, _ := api.industryChallengeRepo.CheckChallengeById(challengeId)
	if !*challengeIsExist {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Not Found",
			Message: "challenge_id is not exist",
		}})
		return
	}

	err := json.NewDecoder(r.Body).Decode(&challengeItem)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Invalid JSON",
			Message: err.Error(),
		}})
		return
	}

	var challengeIdAffected *int64
	challengeIdAffected, err = api.industryChallengeRepo.EditChallenge(
		challengeItem.Name,
		challengeItem.Details,
		challengeItem.ResearchCategory,
		challengeItem.PeriodStart,
		challengeItem.PeriodEnd,
		challengeItem.MaxFunding,
		challengeItem.GuideFile,
		challengeItem.Quota,
		challengeId,
	)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: err.Error(),
		}})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ChallengeSuccessResponse{
		Status:      "Success",
		ChallengeId: *challengeIdAffected,
		Message:     "Research Challenge Edit Successful",
	})
}

func (api *API) deleteChallenge(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)

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

	challengeIsExist, _ := api.industryChallengeRepo.CheckChallengeById(challengeId)
	if !*challengeIsExist {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Not Found",
			Message: "challenge_id is not exist",
		}})
		return
	}

	challengeIdAffected, err := api.industryChallengeRepo.DeleteChallenge(challengeId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Internal Server Error",
			Message: err.Error(),
		}})
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(ChallengeSuccessResponse{
		Status:      "Success",
		ChallengeId: *challengeIdAffected,
		Message:     "Research Challenge Delete Successful",
	})
}
