package repository

import "database/sql"

type ResearcherProfileRepository struct {
	db *sql.DB
}

func NewResearcherProfileRepository(db *sql.DB) *ResearcherProfileRepository {
	return &ResearcherProfileRepository{db: db}
}

func (rpr *ResearcherProfileRepository) GetResearcherIdByUserId(userId int64) (*int64, error) {
	var sqlStatement string
	var researcherId int64

	sqlStatement = `SELECT id FROM researcher_profile WHERE user_id = ?`

	row := rpr.db.QueryRow(sqlStatement, userId)
	err := row.Scan(
		&researcherId,
	)
	if err != nil {
		return nil, err
	}

	return &researcherId, nil
}

func (rpr *ResearcherProfileRepository) GetResearcherProfile(userId int64) (*ResearcherProfile, error) {
	var sqlStatement string
	var researcherProfile ResearcherProfile

	sqlStatement = `
		SELECT
			id,
			team_name,
			leader_name,
			phone_number,
			nidn,
			collage_name,
			address,
			bank_account_num,
			bank_name
		FROM researcher_profile WHERE user_id = ?
	`

	row := rpr.db.QueryRow(sqlStatement, userId)
	err := row.Scan(
		&researcherProfile.Id,
		&researcherProfile.TeamName,
		&researcherProfile.LeaderName,
		&researcherProfile.PhoneNumber,
		&researcherProfile.NIDN,
		&researcherProfile.CollegeName,
		&researcherProfile.Address,
		&researcherProfile.BankAccountNumber,
		&researcherProfile.BankName,
	)

	if err != nil {
		return nil, err
	}

	return &researcherProfile, nil
}

func (rpr *ResearcherProfileRepository) AddResearcherProfile(teamName string, leaderName string, phoneNumber string, nidn string, collageName string, address string, bankAccountNumber string, bankName string, userId int64) (*int64, error) {
	var sqlStatement string
	var lastId int64

	sqlStatement = `
		UPDATE researcher_profile
		SET
			team_name = ?,
			leader_name = ?,
			phone_number = ?,
			nidn = ?,
			collage_name = ?,
			address = ?,
			bank_account_num = ?,
			bank_name = ?
		WHERE user_id = ?
	`

	res, err := rpr.db.Exec(sqlStatement, teamName, leaderName, phoneNumber, nidn, collageName, address, bankAccountNumber, bankName, userId)
	if err != nil {
		return nil, err
	}

	lastId, err = res.LastInsertId()
	if err != nil {
		return nil, err
	}

	return &lastId, nil
}

func (rpr *ResearcherProfileRepository) GetResearcherProfileById(profileId int64) (*ResearcherProfile, error) {
	var sqlStatement string
	var researcherProfile ResearcherProfile

	sqlStatement = `
		SELECT id, team_name, leader_name, phone_number, nidn, collage_name, address, bank_account_num, bank_name
		FROM researcher_profile
		WHERE id = ?
	`

	row := rpr.db.QueryRow(sqlStatement, profileId)
	err := row.Scan(
		&researcherProfile.Id,
		&researcherProfile.TeamName,
		&researcherProfile.LeaderName,
		&researcherProfile.PhoneNumber,
		&researcherProfile.NIDN,
		&researcherProfile.CollegeName,
		&researcherProfile.Address,
		&researcherProfile.BankAccountNumber,
		&researcherProfile.BankName,
	)
	if err != nil {
		return nil, err
	}

	return &researcherProfile, nil
}
