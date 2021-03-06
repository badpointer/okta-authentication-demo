const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
let cors = require('cors');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://{yourOktaBaseUrl}.oktapreview.com/oauth2/default',
    assertClaims: {
      aud: 'api://default',
    },
  });
  

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req,res,next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        return res.status(401).end();
      }
    
    const accessToken = match[1];
    return oktaJwtVerifier.verifyAccessToken(accessToken)
        .then(jwt => {
            req.jwt = jwt;
            next();
        })
        .catch(err => {
            res.status(401).send(err.message);
        });
}

const app = express();

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());


/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/api/messages',authenticationRequired, (req,res) => {
    res.json([
        {message: 'Hello, World from Server'}
    ]);
});

app.listen(8000, () => {
    console.log('Server ready on port 8000');
});