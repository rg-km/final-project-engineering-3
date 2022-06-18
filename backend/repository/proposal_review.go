package repository

import (
	"database/sql"
)

type ProposalReviewRepository struct {
	db *sql.DB
}

func NewProposalReviewRepository(db *sql.DB) *ProposalReviewRepository {
	return &ProposalReviewRepository{db: db}
}

func (prr *ProposalReviewRepository) GetResearchProposalReview(reviewId int) (*ResearchProposalReview, error) {
	var sqlStatement string
	var researchProposalReview ResearchProposalReview

	sqlStatement = `
		SELECT id, research_item_id, proposal_id, funding_status_id, total_score
		FROM research_proposal_review
		WHERE id = ?
	`

	row := prr.db.QueryRow(sqlStatement, reviewId)
	row.Scan(
		&researchProposalReview.Id,
		&researchProposalReview.ResearchItemId,
		&researchProposalReview.ProposalId,
		&researchProposalReview.FundingStatusId,
		&researchProposalReview.TotalFunding,
	)

	return &researchProposalReview, nil
}

func (prr *ProposalReviewRepository) GetFundingStatus(fundingStatusId int) (*FundingStatus, error) {
	var sqlStatement string
	var fundingStatus FundingStatus

	sqlStatement = `
		SELECT id, name
		FROM funding_status
		WHERE id = ?
	`

	row := prr.db.QueryRow(sqlStatement, fundingStatusId)
	row.Scan(
		&fundingStatus.Id,
		&fundingStatus.Name,
	)

	return &fundingStatus, nil
}
