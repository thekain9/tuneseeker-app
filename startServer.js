const app = require('./src/index')
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});