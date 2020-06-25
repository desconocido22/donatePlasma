package transport

import (
	"context"
	"net/http"

	"github.com/StevenRojas/donatePlasma/services/register/pkg/endpoints"
	"github.com/StevenRojas/donatePlasma/services/register/pkg/reqres"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
)

// NewHTTPServer Create new HTTP server instance
func NewHTTPServer(ctx context.Context, endpoints endpoints.Endpoints) http.Handler {
	r := mux.NewRouter()
	//r.Use(middleware)
	r.Methods("POST").Path("/api/register/recipient").Handler(httptransport.NewServer(
		endpoints.CreateRecipient,
		reqres.DecodeCreateRecipientRequest,
		reqres.EncodeResponse,
	))

	return r
}

func middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(
		func(w http.ResponseWriter, r *http.Request) {
			w.Header().Add("Content-Type", "application/json")
			next.ServeHTTP(w, r)
		})
}
