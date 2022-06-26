package api

import (
	"log"
	"net/http"
	"time"

	"github.com/felixge/httpsnoop"
)

type HTTPReqInfo struct {
	method   string
	url      string
	ipaddr   string
	code     int
	duration time.Duration
}

func Logger(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		m := httpsnoop.CaptureMetrics(h, w, r)

		reqInfo := HTTPReqInfo{
			method:   r.Method,
			url:      r.URL.String(),
			ipaddr:   r.RemoteAddr,
			code:     m.Code,
			duration: m.Duration,
		}

		log.Printf("%s %s %s %d %s", reqInfo.ipaddr, reqInfo.method, reqInfo.url, reqInfo.code, reqInfo.duration)
	})
}
