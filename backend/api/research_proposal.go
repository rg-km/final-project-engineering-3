package api

import (
	"encoding/json"
	"net/http"
	"os"
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

func (api *API) uploadFiles(w http.ResponseWriter, r *http.Request) {
	api.AllowOrigin(w, r)
	r.ParseMultipartForm(10 << 20)

	rawProposalId := r.URL.Query().Get("proposal_id")
	if rawProposalId == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name: "Invalid URL Paramenter",
			Message: "proposal_id is required",
		}})
		return
	}

	proposalId, err := strconv.Atoi(rawProposalId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name: "Internal Server Error",
			Message: "internal server error",
		}})
		return
	}

	abstract := r.FormValue("abstract")
	if abstract == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name:    "Abstract Not Found",
			Message: "abstract is required",
		}})
		return
	}

	proposalFile, _, err := r.FormFile("proposal_file")
	if err != nil {
		json.NewEncoder(w).Encode(ChallengeErrorResponse{Error: ChallengeErrorDetailResponse{
			Name: "Invalid Request File",
			Message: "error retrieving the proposal file",
		}})
		return
	}
	defer proposalFile.Close()
	
	optionalFile, _, _ := r.FormFile("optional_file")
	if optionalFile != nil {
		defer optionalFile.Close()
	}

	proposalFileLocationChan := make(chan string)
	optionalFileLocationChan := make(chan string)

	go api.uploadFile(proposalId, proposalFile, "proposal", proposalFileLocationChan)
	go api.uploadFile(proposalId, optionalFile, "optional", optionalFileLocationChan)

	var proposalFileLocation string
	var optionalFileLocation string

	for i := 0; i < 2; i++ {
        select {
        case propFile := <-proposalFileLocationChan:
			proposalFileLocation = propFile
        case optFile := <-optionalFileLocationChan:
			optionalFileLocation = optFile
        }
    }
	
	err = api.researchProposalRepo.UploadProposalFiles(proposalId, proposalFileLocation, optionalFileLocation, abstract)
	if err != nil {
		os.Remove(optionalFileLocation)
		os.Remove(proposalFileLocation)
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
		ProposalId: int64(proposalId),
	})
}
