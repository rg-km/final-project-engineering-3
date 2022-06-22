# fundingresearch.com

## Software Requirements
- Go Language
- SQLite
- Javascript

## Installation
Clone it!
```
git clone https://github.com/rg-km/final-project-engineering-3.git
```

- **Back-End**
1. Run `main.go` inside directory `backend/db/migration` to Migration database SQLite
```
go run backend/db/migration/main.go
```
2. Run `main.go` inside directory `backend/` to run service
```
go run main.go
```
3. Try and enjoy!
```
http://localhost:8080/
```

- **Front-End**


## Available APIs
- **All Role**
	- `POST` : `/login`
	- `POST` : `/register`
	- `POST` : `/logout`

- **Industry Role**
	- `PUT`  : `/industry/profile/edit`
	- `GET`  : `/industry/profile`
	- `POST` : `/industry/challenge/post`
	- `PUT`  : `/industry/challenge/edit?challenge_id=<challenge_id>`
	- `DEL`  : `/industry/challenge/delete?challenge_id=<challenge_id>`
	- `GET`  : `/industry/challenge/review/challengers?challenge_id=<challenge_id>`
	- `GET`  : `/industry/challenge/review/details/?review_id=<review_id>`
	- `POST` : `/industry/challenge/review/details/approval?review_id=<review_id>`

- **Researcher Role**
	- `GET`  : `/researcher/profile`
	- `GET`  : `/researcher/proposal`
	- `GET`  : `/research/details?challenge_id=<challenge_id>`
	- `POST` : `/researcher/challenge/apply?challenge_id=<challenge_id>`
	- `POST` : `/researcher/challenge/upload?proposal_id=<proposal_id>`
	- `POST` : `/researcher/profile/add`
	- `GET`  : `/researcher/chalange/list`
	- `GET`  : `/researcher/challenge/details?challenge_id=<challenge_id>`

APIs Details <link-to-postman-api.com>

## Contributors
- FE2025536	ADRIAN OCTAVIUS <https://github.com/adrnct>
- FE2216683	RICHARDO EHBET REJULI LUMBAN RAJA <https://github.com/Re-Creators>
- BE2180901	FAHRUL ARDIAN NUGROHO <https://github.com/fahrulan>
- BE2009697	FRANKY <https://github.com/Frankyh-9>
- BE2012153	RIVALDI RIZALUL AKHSAN <https://github.com/rivaldyrizal>