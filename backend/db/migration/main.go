package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func Migrate() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "backend/db/final-project-engineering-3.db")
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS user (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			username VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			role_id INTEGER NOT NULL,
			is_logged_in INTEGER NOT NULL,
			activation_token VARCHAR(255) NOT NULL,
			activation_token_expiration TIMESTAMP NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (role_id) REFERENCES role (id)
		);

		CREATE TABLE IF NOT EXISTS role (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);

		CREATE TABLE IF NOT EXISTS admin_profile (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255) NOT NULL,
			user_id INTEGER NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES user (id)
		);

		CREATE TABLE IF NOT EXISTS industry_profile (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255) NOT NULL,
			address VARCHAR(255) NOT NULL,
			description TEXT NOT NULL,
			industry_category_id INTEGER NOT NULL,
			num_of_employees INTEGER NOT NULL,
			phone_number VARCHAR(255) NOT NULL,
			logo VARCHAR(255) NOT NULL,
			user_id INTEGER NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (industry_category_id) REFERENCES industry_category (id),
			FOREIGN KEY (user_id) REFERENCES user (id)
		);

		CREATE TABLE IF NOT EXISTS industry_category (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);

		CREATE TABLE IF NOT EXISTS researcher_profile (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			team_name VARCHAR(255) NOT NULL,
			leader_name VARCHAR(255) NOT NULL,
			phone_number VARCHAR(255) NOT NULL,
			nidn VARCHAR(255) NOT NULL,
			collage_name VARCHAR(255) NOT NULL,
			address VARCHAR(255) NOT NULL,
			bank_account_num VARCHAR(255) NOT NULL,
			bank_name VARCHAR(255) NOT NULL,
			user_id INTEGER NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES user (id)
		);

		CREATE TABLE IF NOT EXISTS research_item (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255) NOT NULL,
			details TEXT NOT NULL,
			research_category_id INTEGER NOT NULL,
			period_start TIMESTAMP NOT NULL,
			period_end TIMESTAMP NOT NULL,
			max_funding INTEGER NOT NULL,
			guide_file VARCHAR(255) NOT NULL,
			quota INTEGER NOT NULL,
			industry_id INTEGER NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (research_category_id) REFERENCES research_category (id),
			FOREIGN KEY (industry_id) REFERENCES industry_profile (id)
		);

		CREATE TABLE IF NOT EXISTS research_category (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);

		CREATE TABLE IF NOT EXISTS proposal (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			researcher_id INTEGER NOT NULL,
			abstract TEXT NOT NULL,
			proposal_doc VARCHAR(255) NOT NULL,
			other_doc VARCHAR(255) NOT NULL,
			submit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (researcher_id) REFERENCES researcher_profile (id)
		);

		CREATE TABLE IF NOT EXISTS research_proposal_review (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			research_item_id INTEGER NOT NULL,
			proposal_id INTEGER NOT NULL,
			funding_status_id INTEGER NOT NULL,
			total_score INTEGER NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (research_item_id) REFERENCES research_item (id),
			FOREIGN KEY (proposal_id) REFERENCES proposal (id),
			FOREIGN KEY (funding_status_id) REFERENCES funding_status (id)
		);

		CREATE TABLE IF NOT EXISTS funding_status (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);

		CREATE TABLE IF NOT EXISTS review_score (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			review_id INTEGER NOT NULL,
			aspect_id INTEGER NOT NULL,
			score INTEGER NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (review_id) REFERENCES research_proposal_review (id),
			FOREIGN KEY (aspect_id) REFERENCES assesment_aspect (id)
		);

		CREATE TABLE IF NOT EXISTS assesment_aspect (
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			aspect_detail TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);

		INSERT INTO role (name) VALUES
			('admin'),
			('industry'),
			('researcher');

		INSERT INTO industry_category (name) VALUES
			('Arsitektur'),
			('Desain'),
			('Edukasi'),
			('Manufaktur'),
			('Minyak Gas'),
			('Otomotif'),
			('Konstruksi'),
			('Pembangkit Energi');

		INSERT INTO research_category (name) VALUES
			('Descriptive'),
			('Exploratory'),
			('Corelational'),
			('Explanatory');

		INSERT INTO funding_status (name) VALUES
			('Reviewed'),
			('Funded'),
			('Rejected');

		INSERT INTO assesment_aspect (aspect_detail) VALUES
			('Kelengkapan dokumen'),
			('Kualitas'),
			('Luaran'),
			('Kemutakhiran'),
			('Rekam Jejak Periset'),
			('Pembagian peran antara kelompok riset'),
			('Market test'),
			('Business plan');
	`)

	if err != nil {
		return nil, err
	}

	return db, nil
}

func Rollback(db *sql.DB) {
	sqlStatement := `DROP TABLE IF EXISTS user;`
	_, err := db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS industry_profile;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS industry_category;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS researcher_profile;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS research_item;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS research_category;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS proposal;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS research_proposal_review;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS funding_status;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS review_score;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS assesment_aspect;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS admin_profile;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}

	sqlStatement = `DROP TABLE IF EXISTS role;`
	_, err = db.Exec(sqlStatement)
	if err != nil {
		panic(err)
	}
}

func main() {
	// for migrate table
	db, err := Migrate()
	if err != nil {
		panic(err)
	}

	// example
	rows, err := db.Query("SELECT * FROM role")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// enable for rollback the schema
	// Rollback(db)
}
