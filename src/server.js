const express = require(‘express’);
const axios = require(‘axios’);
const cors = require(‘cors’);
require(‘dotenv’).config();

const app = express();

app.use(cors());
app.use(express.json());

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || ‘http://localhost:3001/auth/strava/callback’;

app.get(’/auth/strava’, (req, res) => {
const url = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&scope=activity:write,activity:read_all`;
res.redirect(url);
});

app.get(’/auth/strava/callback’, async (req, res) => {
const { code } = req.query;

try {
const response = await axios.post(‘https://www.strava.com/oauth/token’, {
client_id: STRAVA_CLIENT_ID,
client_secret: STRAVA_CLIENT_SECRET,
code: code,
grant_type: ‘authorization_code’,
});

```
const { access_token, athlete } = response.data;
res.redirect(`http://localhost:3000?access_token=${access_token}&athlete_id=${athlete.id}`);
```

} catch (error) {
console.error(‘Error getting access token:’, error);
res.redirect(`http://localhost:3000?error=auth_failed`);
}
});

app.post(’/api/strava/activity’, async (req, res) => {
const { access_token, activity_data } = req.body;

try {
const response = await axios.post(‘https://www.strava.com/api/v3/activities’, activity_data, {
headers: {
Authorization: `Bearer ${access_token}`,
‘Content-Type’: ‘application/json’,
},
});

```
res.json({ success: true, activity: response.data });
```

} catch (error) {
console.error(‘Error creating Strava activity:’, error.response?.data || error);
res.status(500).json({ success: false, error: error.message });
}
});

app.get(’/api/strava/verify’, async (req, res) => {
const { access_token } = req.query;

try {
const response = await axios.get(‘https://www.strava.com/api/v3/athlete’, {
headers: {
Authorization: `Bearer ${access_token}`,
},
});

```
res.json({ valid: true, athlete: response.data });
```

} catch (error) {
res.json({ valid: false });
}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log(`Backend running on port ${PORT}`);
});
