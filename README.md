# Research Funding App
![banner](banner.png)

## About the App
fundingresearch.com is an application for research funding between universities and industry/companies as one of the best ways to decide the problems in Indonesia. The main objectives of this application are:
- Increasing the role of universities in providing guidance to researchers/lecturers at universities in producing quality research.
- Increasing university research collaboration with a partnership system encourages increased quality and quantity of research and its outputs to provide high benefits for industry or community groups in need.
- The industrial sector can provide research funding for universities, then companies can access new research and discoveries that will significantly assist in developing company processes and products.

## Software Requirements
- Go Language
- SQLite
- Ginkgo
- Nodejs v14 or higher
- React v18.1.0 
- react-router-dom v6.3.0
- tailwindcss v3.0.24
- zustand v4.0.0-rc.1
- react-icons v4.4.0
- headlessui/react v1.6.5

## Installation
**Clone it!**
```
git clone https://github.com/rg-km/final-project-engineering-3.git
```

**Back-End**
1. Run `main.go` inside directory `backend/db/migration` to Migration database SQLite
```
go run backend/db/migration/main.go
```
2. Run `main.go` inside directory `/backend` to run service
3. Try and enjoy!
```
http://api.fundingresearch.com:8080
```

**Front-End**
1. Run this command inside directory `/frontend`
```
npm install
```
```
npm start
```
2. Try and enjoy!

## Available APIs
**All Role**
- `POST` : `/login`
- `POST` : `/register`
- `POST` : `/logout`

**Industry Role**
- `PUT`  : `/industry/profile/edit`
- `GET`  : `/industry/profile`
- `POST` : `/industry/challenge/post`
- `PUT`  : `/industry/challenge/edit?challenge_id=<challenge_id>`
- `DEL`  : `/industry/challenge/delete?challenge_id=<challenge_id>`
- `GET`  : `/industry/challenge/list`
- `GET`  : `/industry/challenge/review/challengers?challenge_id=<challenge_id>`
- `GET`  : `/industry/challenge/review/details/?review_id=<review_id>`
- `POST` : `/industry/challenge/review/details/approval?review_id=<review_id>`
- `GET`  : `/industry/challenge/list`
- `GET`  : `/industry/logo?file_name=<file_location_and_file_name>`
- `GET`  : `/proposal/files?file_name=<file_location_and_name>`

**Researcher Role**
- `GET`  : `/researcher/profile`
- `GET`  : `/researcher/proposal`
- `GET`  : `/research/details?challenge_id=<challenge_id>`
- `POST` : `/researcher/challenge/apply?challenge_id=<challenge_id>`
- `POST` : `/researcher/challenge/upload?proposal_id=<proposal_id>`
- `PUT` : `/researcher/profile/edit`
- `GET`  : `/researcher/challenge/list`
- `GET`  : `/researcher/challenge/details?challenge_id=<challenge_id>`
- `GET`  : `/research/guide-file?challenge_id=10>`

API documentation can be found at <https://documenter.getpostman.com/view/21460421/UzBjrSiV>

## Contributors
- FE2025536	ADRIAN OCTAVIUS <https://github.com/adrnct>
- FE2216683	RICHARDO EHBET REJULI LUMBAN RAJA <https://github.com/Re-Creators>
- BE2180901	FAHRUL ARDIAN NUGROHO <https://github.com/fahrulan>
- BE2009697	FRANKY <https://github.com/Frankyh-9>
- BE2012153	RIVALDI RIZALUL AKHSAN <https://github.com/rivaldyrizal>