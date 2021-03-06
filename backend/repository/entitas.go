package repository

import "time"

type User struct {
	ID         int64  `json:"id"`
	Username   string `json:"username"`
	Password   string `json:"password"`
	Email      string `json:"email"`
	RoleID     int64  `json:"role_id"`
	IsLoggedin bool   `json:"is_logged_in"`
}

type IndustryProfile struct {
	Id               int64  `json:"id"`
	Name             string `json:"name"`
	Address          string `json:"address"`
	Description      string `json:"description"`
	IndustryCategory string `json:"industry_category"`
	NumOfEmployees   int64  `json:"num_of_employees"`
	PhoneNumber      string `json:"phone_number"`
	Logo             string `json:"logo"`
	UserId           int64  `json:"user_id"`
	CreatedAt        string `json:"created_at"`
	UpdatedAt        string `json:"updated_at"`
}

type ResearcherProfile struct {
	Id                int64  `json:"id"`
	TeamName          string `json:"team_name"`
	LeaderName        string `json:"leader_name"`
	PhoneNumber       string `json:"phone_number"`
	NIDN              string `json:"nidn"`
	CollegeName       string `json:"college_name"`
	Address           string `json:"address"`
	BankAccountNumber string `json:"bank_account_number"`
	BankName          string `json:"bank_name"`
}

type ResearchProposal struct {
	Id               int64     `json:"id"`
	ChallengeName    string    `json:"challenge_name"`
	PeriodStart      time.Time `json:"period_start"`
	PeriodEnd        time.Time `json:"period_end"`
	IndustryName     string    `json:"industry_name"`
	ResearchCategory string    `json:"research_category"`
	FundingStatus    string    `json:"funding_status"`
}

type ResearchChallengeItem struct {
	Id               int64     `json:"id"`
	Name             string    `json:"name"`
	Details          string    `json:"details"`
	ResearchCategory string    `json:"research_category"`
	PeriodStart      time.Time `json:"period_start"`
	PeriodEnd        time.Time `json:"period_end"`
	MaxFunding       int64     `json:"max_funding"`
	GuideFile        string    `json:"guide_file"`
	Quota            int64     `json:"quota"`
	IndustryName     string    `json:"industry_name"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type Challenger struct {
	Id            int64  `json:"review_id"`
	FundingStatus string `json:"funding_status"`
	TeamName      string `json:"team_name"`
	CollageName   string `json:"college_name"`
}

type FundingStatus struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

type Proposal struct {
	Id           int64  `json:"id"`
	ResearcherId int64  `json:"researcher_id"`
	Abstract     string `json:"abstract"`
	ProposalDoc  string `json:"proposal_doc"`
	OtherDoc     string `json:"other_doc"`
	SubmitDate   string `json:"submit_date"`
}

type ResearchProposalReview struct {
	Id              int64 `json:"id"`
	ResearchItemId  int64 `json:"research_item_id"`
	ProposalId      int64 `json:"proposal_id"`
	FundingStatusId int64 `json:"funding_status_id"`
	TotalScore      int64 `json:"total_score"`
}
