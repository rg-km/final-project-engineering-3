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

func (icr *IndustryChallengeRepository) GetAllChallengers(challengeId int) (*[]Challenger, error) {
	var sqlStatement string
	var ListOfChallenger []Challenger

	sqlStatement = `
		SELECT rpv.id, fs.name, rp.team_name, rp.collage_name
		FROM research_proposal_review rpv
		INNER JOIN funding_status fs ON rpv.funding_status_id = fs.id
		INNER JOIN proposal p ON rpv.proposal_id = p.id
		INNER JOIN researcher_profile rp ON p.researcher_id = rp.id
		WHERE rpv.research_item_id = ?
	`

	rows, err := icr.db.Query(sqlStatement, challengeId)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var challenger Challenger
		err := rows.Scan(&challenger.Id, &challenger.FundingStatus, &challenger.TeamName, &challenger.CollageName)
		if err != nil {
			return nil, err
		}

		ListOfChallenger = append(ListOfChallenger, challenger)
	}

	return &ListOfChallenger, nil
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
