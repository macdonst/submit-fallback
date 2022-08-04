@app
submit-fallback

@static

@http
get /cats
post /cats

@tables
cats
  id *String

@aws
# profile default
region us-west-2
architecture arm64
