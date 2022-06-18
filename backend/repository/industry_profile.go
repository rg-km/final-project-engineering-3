package repository

import (
	"database/sql"
	"time"
)

type IndustryProfileRepository struct {
	db *sql.DB
}

func NewIndustryProfileRepository(db *sql.DB) *IndustryProfileRepository {
	return &IndustryProfileRepository{db: db}
}

func (ipr *IndustryProfileRepository) GetIndustryIdByUserId(userId int64) (*int64, error) {
	var sqlStatement string
	var industryId int64

	sqlStatement = `SELECT id FROM industry_profile WHERE user_id = ?`

	row := ipr.db.QueryRow(sqlStatement, userId)
	err := row.Scan(
		&industryId,
	)
	if err != nil {
		return nil, err
	}

	return &industryId, nil
}

func (ipr *IndustryProfileRepository) GetIndustryProfile(profileId int64) (*IndustryProfile, error) {
	var sqlStatement string
	var industryProfile IndustryProfile

	sqlStatement = `
		SELECT
			ip.id
			, ip.name
			, ip.address
			, ip.description
			, ic.name
			, ip.num_of_employees
			, ip.phone_number
			, ip.logo
			, ip.user_id
			, ip.created_at
			, ip.updated_at
		FROM industry_profile ip
		INNER JOIN industry_category ic ON ip.industry_category_id = ic.id
		WHERE ip.id = ?
	`

	row := ipr.db.QueryRow(sqlStatement, profileId)

	row.Scan(
		&industryProfile.Id,
		&industryProfile.Name,
		&industryProfile.Address,
		&industryProfile.Description,
		&industryProfile.IndustryCategory,
		&industryProfile.NumOfEmployees,
		&industryProfile.PhoneNumber,
		&industryProfile.Logo,
		&industryProfile.UserId,
		&industryProfile.CreatedAt,
		&industryProfile.UpdatedAt,
	)

	return &industryProfile, nil
}

func (ipr *IndustryProfileRepository) EditIndustryProfile(name string, address string, description string, industryCategoryId int64, numOfEmployees int64, phoneNumber string, logo string, user_id int64) (*IndustryProfile, error) {

	var sqlStatement string
	var industryProfile IndustryProfile

	sqlStatement = `
		UPDATE industry_profile
		SET name = ?, address = ?, description = ?, industry_category_id = ?, num_of_employees = ?, phone_number = ?, logo = ?, updated_at = ?
		WHERE user_id = ?
	`

	_, err := ipr.db.Exec(sqlStatement, name, address, description, industryCategoryId, numOfEmployees, phoneNumber, logo, time.Now().Format("2006-01-02 15:04:05"), user_id)
	if err != nil {
		return nil, err
	}

	sqlStatement = `
		SELECT
			p.id
			, p.name
			, p.address
			, p.description
			, c.name
			, p.num_of_employees
			, p.phone_number
			, p.logo
			, p.user_id
			, p.created_at
			, p.updated_at
		FROM industry_profile p
		INNER JOIN industry_category c ON p.industry_category_id = c.id
		WHERE p.user_id = ?
	`

	row := ipr.db.QueryRow(sqlStatement, user_id)
	err = row.Scan(
		&industryProfile.Id,
		&industryProfile.Name,
		&industryProfile.Address,
		&industryProfile.Description,
		&industryProfile.IndustryCategory,
		&industryProfile.NumOfEmployees,
		&industryProfile.PhoneNumber,
		&industryProfile.Logo,
		&industryProfile.UserId,
		&industryProfile.CreatedAt,
		&industryProfile.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &industryProfile, nil
}
