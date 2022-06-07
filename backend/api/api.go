package api

import (
	"fmt"
	"net/http"

	"github.com/rg-km/final-project-engineering-3/backend/repository"
)

type API struct {
	mux *http.ServeMux
}

func NewApi(exampleRepository repository.ExampleRepository) API {
	mux := http.NewServeMux()
	api := API{
		mux,
	}

	mux.Handle("/", api.GET(http.HandlerFunc(api.HelloWorld)))

	return api
}

func (api *API) Handler() *http.ServeMux {
	return api.mux
}

func (api *API) Start() {
	fmt.Println("starting web server at http://localhost:8080/")
	http.ListenAndServe(":8080", api.Handler())
}
