package repository

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